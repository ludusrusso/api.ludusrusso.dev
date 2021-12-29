import { gql } from "apollo-server-core";
import { Resolvers } from "../graphql";
import { DateTimeResolver } from "graphql-scalars";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }
`;

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    _: () => true,
  },
  Mutation: {
    _: () => true,
  },
};
