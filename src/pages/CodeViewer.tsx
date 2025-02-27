
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
  },
  "1": {
    title: "Next.js Starter Kit",
    description: "Full-featured Next.js starter template with authentication, API routes, and Tailwind CSS.",
    files: {
      "pages/index.tsx": {
        content: `import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Next.js Starter Kit</title>
        <meta name="description" content="A modern Next.js starter template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Next.js Starter Kit</h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-8">
          A production-ready template for building fast, modern web applications with Next.js, Tailwind CSS, and TypeScript.
        </p>
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium"
            onClick={() => setIsLoading(true)}
          >
            Get Started
          </button>
          <a
            href="https://github.com/yourusername/nextjs-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium"
          >
            View on GitHub
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home`,
        language: "typescript"
      },
      "components/Header.tsx": {
        content: `import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Next.js Starter</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/features" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/docs" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Documentation
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}`,
        language: "typescript"
      },
      "components/Footer.tsx": {
        content: `export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Blog
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Jobs
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Press
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Accessibility
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-500 hover:text-gray-900">
              Partners
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} Next.js Starter Kit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}`,
        language: "typescript"
      },
      "pages/_app.tsx": {
        content: `import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp`,
        language: "typescript"
      },
      "README.md": {
        content: `# Next.js Starter Kit

A full-featured Next.js starter template with authentication, API routes, and Tailwind CSS.

## Features

- ⚡️ Next.js 13
- 🌈 TypeScript
- 🎨 Tailwind CSS - Utility-first CSS framework
- 🔐 Authentication with NextAuth.js
- 🧩 API routes with Next.js API
- 📄 ESLint — Find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐕 Husky — For running scripts before committing
- 🧪 Jest — Testing Framework
- 📕 Storybook — UI Component Explorer
- 🤖 SEO-friendly with Next.js Head and Sitemap
- 📱 PWA Ready with next-pwa

## Getting Started

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/nextjs-starter.git my-app
cd my-app
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

\`\`\`
.
├── components/         # React components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── _app.tsx        # Custom App component
│   └── index.tsx       # Home page
├── public/             # Static assets
├── styles/             # Global styles
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── .env.local.example  # Environment variables example
└── README.md
\`\`\``,
        language: "markdown"
      }
    },
    stars: 892,
    forks: 156,
    views: 3500,
    features: [
      "Next.js 13 with App Router",
      "TypeScript integration",
      "Tailwind CSS for styling",
      "Authentication with NextAuth.js",
      "API Routes",
      "SEO optimized",
      "Dark mode support"
    ],
    contributing: {
      guidelines: "Contributions are welcome! Please check our contributing guidelines.",
      setupSteps: [
        "Fork the repository",
        "Clone your fork",
        "Create a feature branch",
        "Install dependencies",
        "Make your changes",
        "Run tests",
        "Submit a pull request"
      ],
      requirements: [
        "Follow the code style of the project",
        "Add tests for new features",
        "Make sure all tests pass",
        "Update documentation for any changes",
        "Keep pull requests focused on a single feature"
      ]
    }
  },
  "2": {
    title: "React Admin Dashboard",
    description: "Modern React admin dashboard template with Material UI, charts, and advanced components.",
    files: {
      "src/App.tsx": {
        content: `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;`,
        language: "typescript"
      },
      "src/components/Sidebar.tsx": {
        content: `import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 240,
          flexShrink: 0,
          backgroundColor: theme.palette.background.paper,
          borderRight: \`1px solid \${theme.palette.divider}\`,
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        <Box p={2} display="flex" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Admin Dashboard
          </Typography>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Mobile menu */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1100,
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          borderBottom: \`1px solid \${theme.palette.divider}\`,
          padding: 1,
        }}
      >
        <MenuIcon
          onClick={() => setIsMobileMenuOpen(true)}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Admin Dashboard
        </Typography>
      </Box>

      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <Box width={240}>
          <Box p={2}>
            <Typography variant="h6" fontWeight="bold">
              Admin Dashboard
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;`,
        language: "typescript"
      },
      "src/pages/Dashboard.tsx": {
        content: `import { Grid, Paper, Typography, Box } from '@mui/material';
import { 
  TrendingUp, 
  People, 
  AttachMoney, 
  ShoppingCart 
} from '@mui/icons-material';
import Chart from '../components/Chart';

const Dashboard = () => {
  // Sample data for the charts
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4000 },
    { name: 'May', value: 7000 },
    { name: 'Jun', value: 6000 },
  ];

  const visitorData = [
    { name: 'Jan', value: 1000 },
    { name: 'Feb', value: 2000 },
    { name: 'Mar', value: 3000 },
    { name: 'Apr', value: 2500 },
    { name: 'May', value: 4000 },
    { name: 'Jun', value: 5000 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={4}>
        Dashboard
      </Typography>
      
      {/* Stat cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              border: '1px solid #eee',
            }}
          >
            <Box
              sx={{
                bgcolor: 'primary.light',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
              }}
            >
              <TrendingUp color="primary" />
            </Box>
            <div>
              <Typography color="textSecondary" variant="body2">
                Total Sales
              </Typography>
              <Typography variant="h6">$23,568</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              border: '1px solid #eee',
            }}
          >
            <Box
              sx={{
                bgcolor: 'success.light',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
              }}
            >
              <People color="success" />
            </Box>
            <div>
              <Typography color="textSecondary" variant="body2">
                New Users
              </Typography>
              <Typography variant="h6">2,356</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              border: '1px solid #eee',
            }}
          >
            <Box
              sx={{
                bgcolor: 'warning.light',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
              }}
            >
              <AttachMoney color="warning" />
            </Box>
            <div>
              <Typography color="textSecondary" variant="body2">
                Total Profit
              </Typography>
              <Typography variant="h6">$12,789</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              border: '1px solid #eee',
            }}
          >
            <Box
              sx={{
                bgcolor: 'error.light',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                display: 'flex',
              }}
            >
              <ShoppingCart color="error" />
            </Box>
            <div>
              <Typography color="textSecondary" variant="body2">
                Orders
              </Typography>
              <Typography variant="h6">678</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid #eee',
              height: '100%',
            }}
          >
            <Typography variant="h6" mb={2}>
              Sales Overview
            </Typography>
            <Chart data={salesData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid #eee',
              height: '100%',
            }}
          >
            <Typography variant="h6" mb={2}>
              Visitor Stats
            </Typography>
            <Chart data={visitorData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;`,
        language: "typescript"
      },
      "README.md": {
        content: `# React Admin Dashboard

A modern React admin dashboard template with Material UI, charts, and advanced components.

## Features

- 🎨 Material UI - Beautiful and customizable UI components
- 📊 Recharts - Responsive charts and graphs
- 🔐 Authentication and role-based access
- 📱 Fully responsive design
- 🌙 Dark mode support
- 📊 Data tables with filtering, sorting, and pagination
- 🧩 Reusable components
- 📝 Form validation with Formik and Yup

## Getting Started

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/react-admin-dashboard.git
cd react-admin-dashboard
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn
\`\`\`

3. Start the development server
\`\`\`bash
npm start
# or
yarn start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

\`\`\`
.
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── theme/           # Material UI theme configuration
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Application entry point
└── README.md            # Documentation
\`\`\`

## Customization

The dashboard can be easily customized to fit your needs. You can:

- Modify the theme in \`src/theme.ts\`
- Add new pages in the \`src/pages\` directory
- Customize the sidebar items in \`src/components/Sidebar.tsx\`

## Deployment

Build the application for production:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

The build artifacts will be stored in the \`build/\` directory, ready to be deployed.`,
        language: "markdown"
      }
    },
    stars: 715,
    forks: 125,
    views: 2800,
    features: [
      "Material UI components",
      "Responsive layout",
      "Interactive charts",
      "Data tables",
      "Form validation",
      "Authentication",
      "Dark mode support"
    ],
    contributing: {
      guidelines: "We welcome contributions! Please follow these guidelines to ensure your PR can be accepted.",
      setupSteps: [
        "Fork the repository",
        "Clone your fork",
        "Create a new branch for your feature",
        "Install dependencies",
        "Make your changes",
        "Test your changes",
        "Submit a pull request"
      ],
      requirements: [
        "Follow the code style of the project",
        "Add comments to your code where necessary",
        "Update documentation for your changes",
        "Write/update tests for your feature",
        "Ensure your changes don't break existing functionality"
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
          <Tabs defaultValue={files[0]} onValueChange={setActiveFile}>
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
              <TabsList className="w-full justify-start h-auto gap-2 bg-transparent">
                {files.map((file) => (
                  <TabsTrigger
                    key={file}
                    value={file}
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
            
            {files.map((file) => (
              <TabsContent key={file} value={file} className="mt-0">
                <div className="p-4 bg-muted/50">
                  <SyntaxHighlighter
                    language={boilerplate.files[file].language}
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "transparent",
                    }}
                  >
                    {boilerplate.files[file].content}
                  </SyntaxHighlighter>
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
