import { gql } from "apollo-server-core";
import { Resolvers } from "../graphql";

export const typeDefs = gql`
  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    _: () => true,
  },
  Mutation: {
    _: () => true,
  },
};
