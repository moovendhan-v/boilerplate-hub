import { createYoga } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { join } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './modules';
import { NextRequest } from 'next/server';
import { createContext } from './context';

const baseSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/base.graphql'), 'utf8');
const userSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/user/schema.graphql'), 'utf8');
const boilerplateSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/boilerplate/schema.graphql'), 'utf8');
const fileSchema = readFileSync(join(process.cwd(), 'app/api/graphql/modules/file/schema.graphql'), 'utf8');

const typeDefs = [baseSchema, userSchema, boilerplateSchema, fileSchema].join('\n');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: globalThis,
  graphiql: process.env.NODE_ENV === 'development',
  landingPage: false,
  cors: false, // Let Next.js handle CORS
  context: async ({ request }) => {
    return await createContext({ req: request });
  }
});

export async function POST(request: NextRequest) {
  const response = await yoga.fetch(request);
  
  // Ensure JSON content type
  response.headers.set('Content-Type', 'application/json');
  
  return response;
}

// Handle GET requests (optional, for GraphiQL in development)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    const response = await yoga.fetch(request);
    return response;
  }
  
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
