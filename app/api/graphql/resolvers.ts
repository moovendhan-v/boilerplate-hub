import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    boilerplates: async () => {
      return await prisma.boilerplate.findMany({
        include: { author: true },
      });
    },
    boilerplate: async (_, { id }) => {
      return await prisma.boilerplate.findUnique({
        where: { id },
        include: { author: true },
      });
    },
    users: async () => {
      return await prisma.user.findMany({
        include: { boilerplates: true },
      });
    },
    user: async (_, { id }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: { boilerplates: true },
      });
    },
  },
  Mutation: {
    createBoilerplate: async (_, { name, description, tags, framework, language, authorId }) => {
      return await prisma.boilerplate.create({
        data: {
          name,
          description,
          tags,
          framework,
          language,
          authorId,
        },
        include: { author: true },
      });
    },
    updateBoilerplate: async (_, { id, ...data }) => {
      return await prisma.boilerplate.update({
        where: { id },
        data,
        include: { author: true },
      });
    },
    deleteBoilerplate: async (_, { id }) => {
      await prisma.boilerplate.delete({
        where: { id },
      });
      return true;
    },
  },
};