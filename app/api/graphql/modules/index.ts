import { boilerplateResolvers } from './boilerplate/resolvers';
import { userResolvers } from './user/resolvers';
import { fileResolvers } from './file/resolvers';

export const resolvers = {
  Query: {
    ...boilerplateResolvers.Query,
    ...userResolvers.Query,
    ...fileResolvers.Query,
  },
  Mutation: {
    ...boilerplateResolvers.Mutation,
    ...(userResolvers as any).Mutation,
    ...fileResolvers.Mutation,
  },
};