import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const boilerplates = await prisma.boilerplate.findMany({
      include: {
        author: true,
      },
    });

    // Transform the data to match the frontend component requirements
    const transformedBoilerplates = boilerplates.map((boilerplate) => ({
      id: boilerplate.id,
      title: boilerplate.name,
      description: boilerplate.description,
      language: boilerplate.language,
      stars: boilerplate.stars,
      forks: 0, // Add this field to the schema if needed
      author: {
        name: boilerplate.author.name || 'Anonymous',
        avatar: 'https://github.com/github.png', // Default avatar
      },
    }));

    return NextResponse.json(transformedBoilerplates);
  } catch (error) {
    console.error('Failed to fetch boilerplates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boilerplates' },
      { status: 500 }
    );
  }
}