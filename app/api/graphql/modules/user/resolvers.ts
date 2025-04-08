import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

type LoginResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
  };
  token: string;
};

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
    me: async (_, __, { user }) => {
      if (!user?.id) {
        throw new Error('Not authenticated');
      }
      return await prisma.user.findUnique({
        where: { id: user.id },
        include: { boilerplates: true },
      });
    },
  },
  Mutation: {
    register: async (_, { data }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          avatar: data.avatar,
        },
      });

      return user;
    },
    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // Set the cookie
      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      });

      // Return user data with the token
      return {
        user,
        token
      };
    },
    updateProfile: async (_, { data }) => {
      const user = await prisma.user.update({
        where: { email: data.email },
        data: {
          name: data.name,
          avatar: data.avatar,
        },
      });

      return user;
    },
  },
};