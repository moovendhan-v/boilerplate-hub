import { BoilerplateCard } from "@/components/BoilerplateCard";

// export const categories = [
//   { id: "frontend", name: "Frontend" },
//   { id: "backend", name: "Backend" },
//   { id: "fullstack", name: "Full Stack" },
//   { id: "mobile", name: "Mobile" },
//   { id: "desktop", name: "Desktop" },
//   { id: "devops", name: "DevOps" },
// ];

// export const getBoilerplatesByCategory = (categoryId: string | null) => {
//   // This is a mock function that would typically fetch data from an API
//   const boilerplates = [
//     {
//       id: "1",
//       title: "Next.js API Route Boilerplate",
//       description: "A simple API route handler for Next.js applications with TypeScript support and proper error handling.",
//       language: "TypeScript",
//       stars: 245,
//       forks: 32,
//       author: {
//         name: "John Doe",
//         avatar: "https://github.com/github.png",
//       },
//     },
//     {
//       id: "2",
//       title: "React + Vite Starter",
//       description: "Modern React application starter with Vite, TypeScript, and TailwindCSS pre-configured.",
//       language: "TypeScript",
//       stars: 189,
//       forks: 24,
//       author: {
//         name: "Jane Smith",
//         avatar: "https://github.com/github.png",
//       },
//     },
//     // Add more mock data as needed
//   ];

//   if (!categoryId) return boilerplates;
//   return boilerplates.filter(boilerplate => boilerplate.language.toLowerCase() === categoryId.toLowerCase());
// };

export interface BoilerplateFile {
  id: string;
  name: string;
  content: string;
  language: string;
  path: string;
}

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  category: string;
  files: BoilerplateFile[];
  readme?: string;
  author: {
    name: string;
    avatar: string;
  };
}

// Categories for boilerplates
export const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'fullstack', name: 'Full Stack' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'devops', name: 'DevOps' },
  { id: 'database', name: 'Database' },
];

// Sample boilerplates with category and files
export const sampleBoilerplates: Boilerplate[] = [
  {
    id: "1",
    title: "Next.js API Route Boilerplate",
    description: "A simple API route handler for Next.js applications with TypeScript support and proper error handling.",
    language: "TypeScript",
    stars: 245,
    forks: 32,
    category: 'backend',
    files: [
      {
        id: '1-1',
        name: 'api-handler.ts',
        content: 'export default async function handler(req, res) {\n  try {\n    // Your API logic here\n    res.status(200).json({ success: true })\n  } catch (error) {\n    res.status(500).json({ error: error.message })\n  }\n}',
        language: 'typescript',
        path: '/pages/api/example.ts'
      },
      {
        id: '1-2',
        name: 'types.ts',
        content: 'export interface ApiResponse {\n  success: boolean;\n  data?: any;\n  error?: string;\n}',
        language: 'typescript',
        path: '/types/api.ts'
      }
    ],
    readme: '# Next.js API Route Boilerplate\n\nThis boilerplate provides a simple structure for creating API routes in Next.js applications.\n\n## Usage\n\nCopy the files into your Next.js project and modify as needed.',
    author: {
      name: "John Doe",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "2",
    title: "React + Vite Starter",
    description: "Modern React application starter with Vite, TypeScript, and TailwindCSS pre-configured.",
    language: "TypeScript",
    stars: 189,
    forks: 24,
    category: 'frontend',
    files: [
      {
        id: '2-1',
        name: 'vite.config.ts',
        content: 'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\n\nexport default defineConfig({\n  plugins: [react()],\n});',
        language: 'typescript',
        path: '/vite.config.ts'
      },
      {
        id: '2-2',
        name: 'App.tsx',
        content: 'function App() {\n  return (\n    <div className="p-4">\n      <h1 className="text-2xl font-bold">React + Vite Starter</h1>\n    </div>\n  )\n}\n\nexport default App',
        language: 'tsx',
        path: '/src/App.tsx'
      }
    ],
    readme: '# React + Vite Starter\n\nA modern React starter template using Vite, TypeScript, and TailwindCSS.\n\n## Getting Started\n\n```bash\nnpm install\nnpm run dev\n```',
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "3",
    title: "Express.js REST API",
    description: "Production-ready Express.js REST API boilerplate with authentication, validation, and database integration.",
    language: "JavaScript",
    stars: 567,
    forks: 89,
    category: 'backend',
    files: [
      {
        id: '3-1',
        name: 'server.js',
        content: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\napp.get("/api", (req, res) => {\n  res.json({ message: "API is working" });\n});\n\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT, () => console.log(`Server running on port ${PORT}`));',
        language: 'javascript',
        path: '/server.js'
      }
    ],
    readme: '# Express.js REST API Boilerplate\n\nA production-ready Express.js REST API boilerplate with authentication, validation, and database integration.\n\n## Features\n\n- Authentication with JWT\n- Request validation\n- MongoDB integration\n- Error handling middleware',
    author: {
      name: "Mike Johnson",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "4",
    title: "FastAPI Backend Template",
    description: "Modern Python backend with FastAPI, SQLAlchemy, and Pydantic for type-safe API development.",
    language: "Python",
    stars: 423,
    forks: 67,
    category: 'backend',
    files: [
      {
        id: '4-1',
        name: 'main.py',
        content: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\nasync def read_root():\n    return {"message": "Hello World"}\n',
        language: 'python',
        path: '/main.py'
      }
    ],
    readme: '# FastAPI Backend Template\n\nModern Python backend with FastAPI, SQLAlchemy, and Pydantic for type-safe API development.\n\n## Features\n\n- FastAPI framework\n- SQLAlchemy ORM\n- Pydantic data validation',
    author: {
      name: "Sarah Wilson",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "5",
    title: "Docker Compose Setup",
    description: "Complete development environment with Docker Compose, including Nginx, PostgreSQL, and Redis.",
    language: "Docker",
    stars: 312,
    forks: 45,
    category: 'devops',
    files: [
      {
        id: '5-1',
        name: 'docker-compose.yml',
        content: 'version: "3.8"\nservices:\n  web:\n    image: nginx:latest\n    ports:\n      - "80:80"\n',
        language: 'yaml',
        path: '/docker-compose.yml'
      }
    ],
    readme: '# Docker Compose Setup\n\nComplete development environment with Docker Compose, including Nginx, PostgreSQL, and Redis.\n\n## Services\n\n- Nginx\n- PostgreSQL\n- Redis',
    author: {
      name: "Alex Brown",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "6",
    title: "GraphQL + Prisma Starter",
    description: "Full-stack GraphQL application starter with Prisma ORM, NextAuth, and automatic type generation.",
    language: "TypeScript",
    stars: 289,
    forks: 34,
    category: 'fullstack',
    files: [
      {
        id: '6-1',
        name: 'schema.prisma',
        content: 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}\n',
        language: 'prisma',
        path: '/prisma/schema.prisma'
      }
    ],
    readme: '# GraphQL + Prisma Starter\n\nFull-stack GraphQL application starter with Prisma ORM, NextAuth, and automatic type generation.\n\n## Technologies\n\n- GraphQL\n- Prisma\n- NextAuth.js',
    author: {
      name: "Emily Chen",
      avatar: "https://github.com/github.png",
    },
  },
];

// Function to get boilerplates by category
export const getBoilerplatesByCategory = (categoryId: string | null) => {
  if (!categoryId) return sampleBoilerplates;
  return sampleBoilerplates.filter(bp => bp.category === categoryId);
};

// Function to get a boilerplate by ID
export const getBoilerplateById = (id: string) => {
  return sampleBoilerplates.find(bp => bp.id === id);
};

// Function to simulate fetching files for a boilerplate
export const fetchBoilerplateFiles = async (boilerplateId: string): Promise<BoilerplateFile[]> => {
  // In a real application, this would be an API call to fetch files from a backend
  const boilerplate = getBoilerplateById(boilerplateId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(boilerplate?.files || []);
    }, 500); // Simulating network delay
  });
};

// This structure represents what would be stored in MongoDB
export type BoilerplateDocument = Omit<Boilerplate, 'files'> & {
  fileIds: string[]; // References to files stored separately
  createdAt: Date;
  updatedAt: Date;
};

// Example of how data would be prepared for MongoDB
export const prepareForMongoDB = (boilerplate: Boilerplate): BoilerplateDocument => {
  const { files, ...rest } = boilerplate;
  return {
    ...rest,
    fileIds: files.map(file => file.id),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};
