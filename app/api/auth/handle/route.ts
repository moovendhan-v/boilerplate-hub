import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import * as bcrypt from 'bcryptjs';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  name: string;
}

type AuthRoute = 'login' | 'signup' | 'logout';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth-token';

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const route = url.pathname.split('/').pop() as AuthRoute;
    if (!route) {
      return NextResponse.json({ error: 'Invalid route' }, { status: 404 });
    }
    const body = await request.json();

    switch (route) {
      case 'login':
        return handleLogin(body);
      case 'signup':
        return handleSignup(body);
      case 'logout':
        return handleLogout();
      default:
        return NextResponse.json({ error: 'Invalid route' }, { status: 404 });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleLogin({ email, password }: LoginRequest) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json(
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    { status: 200 }
  );

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return response;
}

async function handleSignup({ email, password, name }: SignupRequest) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'user',
    },
  });

  const token = sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const response = NextResponse.json(
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
    { status: 201 }
  );

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  return response;
}

function handleLogout() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  response.cookies.delete(COOKIE_NAME);
  return response;
}