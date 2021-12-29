import { gql } from "apollo-server-core";
import { Resolvers } from "../graphql";

export const typeDefs = gql`
  type Episode {
    id: ID!
    title: String!
    description: String!
    body: String!
    resources: [String]!
    image: String!
    host: Participant!
    createdAt: DateTime!
    updatedAt: DateTime!
    scheduledTime: DateTime!
    guests: [Participant!]!
  }

  input CreateEpisodeForm {
    title: String!
    description: String!
    body: String!
    resources: [String]!
    image: String!
    hostID: ID!
    scheduledTime: DateTime!
    guestsIDs: [ID!]!
  }

  input UpdateEpisodeForm {
    title: String!
    description: String!
    body: String!
    resources: [String]!
    image: String!
    scheduledTime: DateTime!
  }

  type GetEpisodesEdge {
    episode: Episode!
  }

  type GetEpisodesRes {
    total: Int!
    edges: [GetEpisodesEdge!]!
  }

  extend type Query {
    getEpisodes(skip: Int!, take: Int!): GetEpisodesRes!
    getEpisode(id: ID!): Episode
  }

  extend type Mutation {
    createEpisode(form: CreateEpisodeForm!): Episode! @auth
    updateEpisode(id: ID!, form: UpdateEpisodeForm!): Episode! @auth
  }
`;

export const resolvers: Resolvers = {
  Query: {
    getEpisode: (_, { id }, { db }) => {
      return db.episode.findUnique({ where: { id } });
    },
    getEpisodes: async (_, { skip, take }, { db }) => {
      const episodes = await db.episode.findMany({ skip, take });
      const total = await db.episode.count();
      return {
        edges: episodes.map((episode) => ({ episode })),
        total,
      };
    },
  },
  Mutation: {
    createEpisode: (_, { form }, { db }) => {
      const { hostID, guestsIDs, resources, ...data } = form;
      return db.episode.create({
        data: {
          ...data,
          hostId: hostID,
          resources: JSON.stringify(resources),
          guests: {
            create: guestsIDs.map((gid) => ({
              guestId: gid,
            })),
          },
        },
      });
    },
    updateEpisode: (_, { id, form }, { db }) => {
      const { resources, ...data } = form;
      return db.episode.update({
        data: {
          ...data,
          resources: JSON.stringify(resources),
        },
        where: { id },
      });
    },
  },
  Episode: {
    resources: ({ resources }) => {
      if (!resources) {
        return [];
      }
      try {
        const res = JSON.parse(resources);
        if (Array.isArray(res)) {
          return res;
        }
        return [];
      } catch {
        return [];
      }
    },
  },
};
