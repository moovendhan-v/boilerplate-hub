import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema
const BoilerplateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  framework: z.string(),
  language: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const boilerplate = await prisma.boilerplate.findUnique({
        where: { id },
        include: { author: true },
      });
      if (!boilerplate) {
        return res.status(404).json({ error: 'Boilerplate not found' });
      }
      return res.status(200).json(boilerplate);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch boilerplate' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const validatedData = BoilerplateSchema.parse(req.body);
      const boilerplate = await prisma.boilerplate.update({
        where: { id },
        data: validatedData,
        include: { author: true },
      });
      return res.status(200).json(boilerplate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Failed to update boilerplate' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.boilerplate.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete boilerplate' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}