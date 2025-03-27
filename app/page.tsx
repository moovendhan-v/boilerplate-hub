import { Metadata } from 'next';
import Link from 'next/link';
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BoilerplateCard } from "@/components/BoilerplateCard";

export const metadata: Metadata = {
  title: 'Boilerplate Hub - Home',
  description: 'Discover and share boilerplate code for your next project',
};

export default function HomePage() {
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
            <Button variant="default" size="lg" asChild>
              <Link href="/explore">
                Browse All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Featured Boilerplates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BoilerplateCard
              id="1"
              title="Next.js API Route Boilerplate"
              description="A simple API route handler for Next.js applications with TypeScript support and proper error handling."
              language="TypeScript"
              stars={245}
              forks={32}
              author={{
                name: "John Doe",
                avatar: "https://github.com/github.png"
              }}
            />
            <BoilerplateCard
              id="2"
              title="React + Vite Starter"
              description="Modern React application starter with Vite, TypeScript, and TailwindCSS pre-configured."
              language="TypeScript"
              stars={189}
              forks={24}
              author={{
                name: "Jane Smith",
                avatar: "https://github.com/github.png"
              }}
            />
            <BoilerplateCard
              id="3"
              title="Express.js REST API"
              description="Production-ready Express.js REST API boilerplate with authentication, validation, and database integration."
              language="JavaScript"
              stars={567}
              forks={89}
              author={{
                name: "Mike Johnson",
                avatar: "https://github.com/github.png"
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}