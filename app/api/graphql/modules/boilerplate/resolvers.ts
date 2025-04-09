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
    createBoilerplate: async (_, { data }) => {
      try {
        // Input validation
        const { name, description, tags, framework, language, authorId } = data;
        if (!name || !description || !framework || !language || !authorId) {
          throw new Error('Missing required fields');
        }

        // Verify author exists
        const author = await prisma.user.findUnique({
          where: { id: authorId },
        });
        if (!author) {
          throw new Error('Author not found');
        }

        // Create boilerplate
        const boilerplate = await prisma.boilerplate.create({
          data: {
            name,
            description,
            tags: tags || [],
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

        return boilerplate;
      } catch (error) {
        console.error('[GraphQL Error] Failed to create boilerplate:', error);
        throw new Error(
          error instanceof Error 
            ? `Failed to create boilerplate: ${error.message}` 
            : 'Failed to create boilerplate: Unknown error'
        );
      }
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