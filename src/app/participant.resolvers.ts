import { gql } from "apollo-server-core";
import { Resolvers } from "../graphql";

export const typeDefs = gql`
  type Participant {
    id: ID!
    name: String!
    email: String! @auth
    github: String!
    bio: String!
    avatar: String!
    twitter: String
    linkedin: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateParticipantForm {
    name: String!
    email: String!
    github: String!
    bio: String!
    avatar: String
    twitter: String
    linkedin: String
  }

  input UpdateParticipantForm {
    name: String!
    email: String!
    github: String!
    bio: String!
    avatar: String
    twitter: String
    linkedin: String
  }

  type GetParticipantsEdge {
    participant: Participant!
  }

  type GetParticipantsRes {
    total: Int!
    edges: [GetParticipantsEdge!]!
  }

  extend type Query {
    getParticipants(search: String, skip: Int!, take: Int!): GetParticipantsRes!
    getParticipant(id: String!): Participant
  }

  extend type Mutation {
    createParticipant(form: CreateParticipantForm!): Participant! @auth
    updateParticipant(id: ID!, form: UpdateParticipantForm!): Participant! @auth
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    createParticipant: (_, { form }, { db }) => {
      return db.participant.create({ data: form });
    },
    updateParticipant: (_, { form, id }, { db }) => {
      return db.participant.update({ data: form, where: { id } });
    },
  },
  Query: {
    getParticipant: (_, { id }, { db }) => {
      return db.participant.findUnique({ where: { id } });
    },
    getParticipants: async (_, { skip, take, search }, { db }) => {
      const res = await db.participant.findMany({
        skip,
        take,
      });
      const total = await db.participant.count({});
      return {
        total: total,
        edges: res.map((participant) => ({ participant })),
      };
    },
  },
  Participant: {
    avatar: ({ avatar, github }) => (avatar ? avatar : getGuestImage(github)),
  },
};

const getGuestImage = (github: string) => {
  return `https://avatars.githubusercontent.com/${github}`;
};
