import { makeExecutableSchema } from "@graphql-tools/schema";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { gql } from "apollo-server-core";
import { defaultFieldResolver, GraphQLSchema } from "graphql";

export function authDirective(directiveName: string = "auth") {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: gql`
    	directive @${directiveName} on OBJECT | FIELD_DEFINITION
	`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = function (source, args, context, info) {
              const user = context.user;
              if (!user) {
                throw new Error("not authorized");
              }
              return resolve(source, args, context, info);
            };
            return fieldConfig;
          }
        },
      }),
  };
}
