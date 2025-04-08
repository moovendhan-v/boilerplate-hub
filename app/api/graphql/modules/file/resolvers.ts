import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fileResolvers = {
  Query: {
    getCodeFile: async (_, { id }) => {
      return await prisma.codeFile.findUnique({
        where: { id },
      });
    },
    getCodeFiles: async (_, { userId }) => {
      return await prisma.codeFile.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  Mutation: {
    uploadCodeFile: async (_, { projectName, fileName, fileType, content, userId }) => {
      // Validate file type
      const allowedTypes = ['.js', '.ts', '.py', '.java', '.cpp', '.c', '.rb', '.go'];
      if (!allowedTypes.some(type => fileName.endsWith(type))) {
        throw new Error('Unsupported file type. Only code files are allowed.');
      }

      // Create new code file record
      const codeFile = await prisma.codeFile.create({
        data: {
          projectName,
          fileName,
          fileType,
          content,
          userId,
        },
      });

      return codeFile;
    },
  },
};