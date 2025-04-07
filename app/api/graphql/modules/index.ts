import { boilerplateResolvers } from './boilerplate/resolvers';
import { userResolvers } from './user/resolvers';

export const resolvers = {
  Query: {
    ...boilerplateResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...boilerplateResolvers.Mutation,
  },
};