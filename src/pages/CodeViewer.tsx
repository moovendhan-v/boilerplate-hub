import { useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Download, GitFork, Star, Eye, FileCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const boilerplateData = {
  "3": {
    title: "Express.js REST API",
    description: "Production-ready Express.js REST API boilerplate with authentication, validation, and database integration.",
    files: {
      "app.ts": {
        content: `// app.ts
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
        language: "typescript"
      },
      "routes/index.ts": {
        content: `// routes/index.ts
import { Router } from 'express'
import { auth } from '../middleware/auth'
import { userRouter } from './user'
import { postRouter } from './post'

export const router = Router()

router.use('/users', auth, userRouter)
router.use('/posts', auth, postRouter)`,
        language: "typescript"
      },
      "middleware/auth.ts": {
        content: `// middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}`,
        language: "typescript"
      },
      "README.md": {
        content: `# Express.js REST API Boilerplate

A production-ready Express.js REST API boilerplate with authentication, validation, and database integration.

## Features

- TypeScript support
- JWT Authentication
- Request validation
- Database integration
- API documentation
- Error handling
- Logging middleware

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Configure environment variables
4. Start development server: \`npm run dev\`

## Contributing

1. Fork the repository
2. Clone your fork
3. Create a new branch
4. Make your changes
5. Submit a pull request`,
        language: "markdown"
      }
    },
    stars: 567,
    forks: 89,
    views: 2300,
    features: [
      "Express.js with TypeScript",
      "CORS and logging middleware",
      "Modular routing structure",
      "Error handling middleware",
    ],
    contributing: {
      guidelines: "Please read our contributing guidelines before submitting a PR.",
      setupSteps: [
        "Fork the repository",
        "Clone your fork",
        "Create a new branch",
        "Make your changes",
        "Submit a pull request"
      ],
      requirements: [
        "All code must be in TypeScript",
        "Include tests for new features",
        "Follow the existing code style",
        "Update documentation as needed"
      ]
    }
  },
  "4": {
    title: "FastAPI Backend Template",
    description: "Modern Python backend with FastAPI, SQLAlchemy, and Pydantic for type-safe API development.",
    files: {
      "main.py": {
        content: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")`,
        language: "python"
      },
      "app/models/user.py": {
        content: `from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())`,
        language: "python"
      },
      "app/schemas/user.py": {
        content: `from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True`,
        language: "python"
      },
      "app/core/config.py": {
        content: `from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI Template"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()`,
        language: "python"
      },
      "README.md": {
        content: `# FastAPI Backend Template

A modern Python backend template using FastAPI, SQLAlchemy, and Pydantic.

## Features

- FastAPI with Python 3.9+
- PostgreSQL database with SQLAlchemy ORM
- Pydantic models for request/response validation
- Automatic OpenAPI documentation
- Docker support
- Alembic migrations
- JWT authentication

## Getting Started

1. Clone the repository
2. Create a virtual environment: \`python -m venv venv\`
3. Activate the virtual environment:
   - Windows: \`venv\\Scripts\\activate\`
   - Unix: \`source venv/bin/activate\`
4. Install dependencies: \`pip install -r requirements.txt\`
5. Copy \`.env.example\` to \`.env\` and configure
6. Run migrations: \`alembic upgrade head\`
7. Start server: \`uvicorn main:app --reload\`

## Project Structure

\`\`\`
├── app/
│   ├── core/         # Configuration
│   ├── models/       # SQLAlchemy models
│   ├── schemas/      # Pydantic models
│   ├── api/          # API endpoints
│   ├── crud/         # Database operations
│   └── utils/        # Utilities
├── alembic/          # Database migrations
├── tests/            # Test suite
└── main.py          # Application entry point
\`\`\``,
        language: "markdown"
      }
    },
    stars: 423,
    forks: 67,
    views: 1500,
    features: [
      "FastAPI with Python 3.9+",
      "SQLAlchemy ORM integration",
      "Pydantic models for validation",
      "Automatic OpenAPI docs",
      "Docker support",
      "JWT authentication",
      "Database migrations"
    ],
    contributing: {
      guidelines: "We welcome contributions! Please follow our contribution guidelines to ensure your PR can be accepted.",
      setupSteps: [
        "Fork the repository",
        "Clone your fork",
        "Create a virtual environment",
        "Install dependencies",
        "Create a new branch",
        "Make your changes",
        "Run tests",
        "Submit a pull request"
      ],
      requirements: [
        "All code must follow PEP 8 style guide",
        "Add tests for new features",
        "Update documentation as needed",
        "Ensure all tests pass",
        "Type hints are required for all functions"
      ]
    }
  }
};

const CodeViewer = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const boilerplate = id ? boilerplateData[id] : null;

  if (!boilerplate) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Boilerplate not found</h1>
      </div>
    );
  }

  const files = Object.keys(boilerplate.files);
  const currentFile = activeFile || files[0];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(boilerplate.files[currentFile].content);
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

        {/* File Browser and Code Editor */}
        <div className="relative rounded-lg overflow-hidden border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
            <TabsList className="w-full justify-start h-auto gap-2 bg-transparent">
              {files.map((file) => (
                <TabsTrigger
                  key={file}
                  value={file}
                  onClick={() => setActiveFile(file)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm ${
                    currentFile === file ? "bg-background" : ""
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  {file}
                </TabsTrigger>
              ))}
            </TabsList>
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
              language={boilerplate.files[currentFile].language}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
            >
              {boilerplate.files[currentFile].content}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Contributing Section */}
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">How to Contribute</h2>
          <p className="text-muted-foreground mb-4">
            {boilerplate.contributing.guidelines}
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2">Setup Steps</h3>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            {boilerplate.contributing.setupSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold mt-6 mb-2">Requirements</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {boilerplate.contributing.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
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
