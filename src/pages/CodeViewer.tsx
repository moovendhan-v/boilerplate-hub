
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Download, GitFork, Star, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample data - this would typically come from an API
const boilerplateData = {
  "1": {
    title: "Next.js API Route Boilerplate",
    description: "A simple API route handler for Next.js applications",
    code: `// Next.js API Route with TypeScript
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}`,
    stars: 245,
    forks: 32,
    views: 1200,
    features: [
      "TypeScript support out of the box",
      "Proper type definitions for Next.js API handlers",
      "Basic error handling structure",
      "Clean and minimal implementation",
    ]
  },
  "2": {
    title: "React + Vite Starter",
    description: "Modern React application starter with Vite, TypeScript, and TailwindCSS pre-configured.",
    code: `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})`,
    stars: 189,
    forks: 24,
    views: 800,
    features: [
      "Vite for fast development",
      "TypeScript configuration",
      "TailwindCSS setup",
      "Path aliases configured",
    ]
  },
  "3": {
    title: "Express.js REST API",
    description: "Production-ready Express.js REST API boilerplate with authentication, validation, and database integration.",
    code: `// app.ts
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', router)

export default app`,
    stars: 567,
    forks: 89,
    views: 2300,
    features: [
      "Express.js with TypeScript",
      "CORS and logging middleware",
      "Modular routing structure",
      "Error handling middleware",
    ]
  },
  "4": {
    title: "FastAPI Backend Template",
    description: "Modern Python backend with FastAPI, SQLAlchemy, and Pydantic for type-safe API development.",
    code: `# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(title="FastAPI Template")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")`,
    stars: 423,
    forks: 67,
    views: 1500,
    features: [
      "FastAPI with Python 3.9+",
      "SQLAlchemy ORM integration",
      "Pydantic models for validation",
      "Automatic OpenAPI docs",
    ]
  },
  "5": {
    title: "Docker Compose Setup",
    description: "Complete development environment with Docker Compose, including Nginx, PostgreSQL, and Redis.",
    code: `# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp

  redis:
    image: redis:alpine`,
    stars: 312,
    forks: 45,
    views: 900,
    features: [
      "Multi-container setup",
      "PostgreSQL database",
      "Redis caching",
      "Nginx reverse proxy",
    ]
  },
  "6": {
    title: "GraphQL + Prisma Starter",
    description: "Full-stack GraphQL application starter with Prisma ORM, NextAuth, and automatic type generation.",
    code: `// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}`,
    stars: 289,
    forks: 34,
    views: 1100,
    features: [
      "GraphQL API setup",
      "Prisma ORM configuration",
      "NextAuth.js integration",
      "Type-safe resolvers",
    ]
  }
};

const CodeViewer = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const boilerplate = id ? boilerplateData[id] : null;

  if (!boilerplate) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Boilerplate not found</h1>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(boilerplate.code);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{boilerplate.title}</h1>
            <p className="text-muted-foreground">
              {boilerplate.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Star
            </Button>
            <Button variant="outline" size="sm">
              <GitFork className="w-4 h-4 mr-2" />
              Fork
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{boilerplate.stars} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{boilerplate.forks} forks</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{boilerplate.views} views</span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="relative rounded-lg overflow-hidden border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
            <span className="text-sm font-medium">pages/api/hello.ts</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="p-4 bg-muted/50">
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
            >
              {boilerplate.code}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">
            {boilerplate.description}
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {boilerplate.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
