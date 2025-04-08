import { PrismaClient } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

interface AuthTokenPayload {
  userId: string;
}

export async function createContext({ req }) {
  let user = null;

  try {
    // Get the token from the auth_token cookie
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
      // Verify the token
      const { userId } = verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;

      // Get the user from the database
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar: true
        }
      });
    }
  } catch (error) {
    console.error('Auth context error:', error);
  }

  return {
    req,
    prisma,
    user
  };
}