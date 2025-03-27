import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BoilerplateCard } from "@/components/BoilerplateCard";

const sampleBoilerplates = [
  {
    id: "1",
    title: "Next.js API Route Boilerplate",
    description: "A simple API route handler for Next.js applications with TypeScript support and proper error handling.",
    language: "TypeScript",
    stars: 245,
    forks: 32,
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
    author: {
      name: "Emily Chen",
      avatar: "https://github.com/github.png",
    },
  },
];

const Index = () => {
  return (
    <div className="min-h-screen pb-20">
      <main className="container pt-24">
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
              Developer Boilerplates
            </h1>
            <p className="text-lg text-muted-foreground">
              Jump-start your next project with our collection of boilerplates
            </p>
          </div>
          <SearchBar />
          <div className="flex items-center justify-center gap-4">
            <Button variant="default" size="lg">
              Browse All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Submit Boilerplate
            </Button>
          </div>
        </section>

        {/* Boilerplates Grid */}
        <section className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleBoilerplates.map((boilerplate) => (
              <BoilerplateCard key={boilerplate.id} {...boilerplate} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;