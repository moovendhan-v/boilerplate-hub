import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
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
};