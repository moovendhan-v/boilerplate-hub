import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const boilerplateResolvers = {
  Query: {
    boilerplates: async () => {
      return await prisma.boilerplate.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              createdAt: true,
              updatedAt: true
            }
          }
        },
      });
    },
    boilerplate: async (_, { id }) => {
      return await prisma.boilerplate.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              createdAt: true,
              updatedAt: true
            }
          }
        },
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
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              createdAt: true,
              updatedAt: true
            }
          }
        },
      });
    },
    updateBoilerplate: async (_, { id, ...data }) => {
      return await prisma.boilerplate.update({
        where: { id },
        data,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              createdAt: true,
              updatedAt: true
            }
          }
        },
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