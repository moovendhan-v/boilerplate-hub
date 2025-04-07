import { createYoga } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './modules';

const baseSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/base.graphql'), 'utf8');
const userSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/user/schema.graphql'), 'utf8');
const boilerplateSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/boilerplate/schema.graphql'), 'utf8');

const typeDefs = [baseSchema, userSchema, boilerplateSchema].join('\n');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const { handleRequest } = createYoga({
  schema,
  fetchAPI: globalThis,
});

export { handleRequest as GET, handleRequest as POST };
