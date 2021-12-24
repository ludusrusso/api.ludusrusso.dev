import { gql } from "apollo-server-core";
import { Resolvers } from "../graphql";

export const typeDefs = gql`
  type LoginRes {
    accessToken: String!
    refreshToken: String!
  }

  extend type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): LoginRes!
    refresh(refreshToken: String!): String!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    login: (_, { email, password }, { auth }) => {
      return auth.loginUser(email, password);
    },
    refresh: (_, { refreshToken }, { auth }) => {
      return auth.verifyRefreshToken(refreshToken);
    },
    register: (_, { email, password }, { auth }) => {
      return auth.createUser(email, password);
    },
  },
};
