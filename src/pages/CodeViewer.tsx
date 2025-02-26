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
