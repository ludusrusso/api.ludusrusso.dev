// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { ApolloServer } from "apollo-server-express";
import { DocumentNode } from "graphql";
import { createContext } from "./context";
import { Resolvers } from "./graphql";
import depthLimit from "graphql-depth-limit";

import * as appResolvers from "./app";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { logger } from "./logger";
import { authDirective } from "./directives/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";

interface ResolverAndTypeDefs {
  typeDefs: DocumentNode;
  resolvers: Resolvers;
}

const { authDirectiveTypeDefs, authDirectiveTransformer } =
  authDirective("auth");

const createServer = (...subServer: ResolverAndTypeDefs[]) => {
  const typeDefs = subServer.map((s) => s.typeDefs);
  const resolvers = subServer.map((s) => s.resolvers);

  const schema = makeExecutableSchema({
    typeDefs: [...typeDefs, authDirectiveTypeDefs],
    resolvers: [...resolvers],
  });

  return new ApolloServer({
    schema: authDirectiveTransformer(schema),
    context: createContext,
    formatError: (err) => {
      logger.error(err);
      return err;
    },
    validationRules: [depthLimit(10)],
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
};

export const gqlServer = createServer(...Object.values(appResolvers));
