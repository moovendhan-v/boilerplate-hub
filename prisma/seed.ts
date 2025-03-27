import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // First, create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
    },
  });

  // Create sample boilerplates
  const boilerplates = [
    {
      name: 'Next.js Starter Kit',
      description: 'A modern Next.js boilerplate with TypeScript, Tailwind CSS, and more',
      tags: ['next.js', 'typescript', 'tailwind'],
      framework: 'Next.js',
      language: 'TypeScript',
      authorId: user.id,
    },
    {
      name: 'React Vite Template',
      description: 'Lightning-fast React development with Vite and TypeScript',
      tags: ['react', 'vite', 'typescript'],
      framework: 'React',
      language: 'TypeScript',
      authorId: user.id,
    },
    {
      name: 'Express API Starter',
      description: 'RESTful API boilerplate with Express.js and MongoDB',
      tags: ['express', 'mongodb', 'api'],
      framework: 'Express.js',
      language: 'JavaScript',
      authorId: user.id,
    },
    {
      name: 'Vue 3 Composition Template',
      description: 'Modern Vue.js setup with Composition API and TypeScript',
      tags: ['vue', 'composition-api', 'typescript'],
      framework: 'Vue.js',
      language: 'TypeScript',
      authorId: user.id,
    },
  ];

  for (const boilerplate of boilerplates) {
    await prisma.boilerplate.upsert({
      where: {
        id: 'placeholder', // This will always create new entries since ID won't match
      },
      update: {},
      create: boilerplate,
    });
  }

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });