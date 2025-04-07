'use client';

import Link from 'next/link';
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BoilerplateCard } from "@/components/BoilerplateCard";
import { useBoilerplateStore } from '@/store/boilerplate-store';
import { useEffect } from 'react';

export default function HomePage() {
  const { boilerplates, loading, error, fetchBoilerplates } = useBoilerplateStore();

  useEffect(() => {
    fetchBoilerplates();
  }, [fetchBoilerplates]);

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
          <h2 className="text-2xl font-bold mb-6">Featured Boilerplatess</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div>Loading boilerplates...</div>
            ) : error ? (
              <div>Error page: {error}</div>
            ) : (
              boilerplates.slice(0, 3).map((boilerplate) => (
                <BoilerplateCard
                  key={boilerplate.id}
                  id={boilerplate.id}
                  name={boilerplate.name}
                  description={boilerplate.description}
                  language={boilerplate.language}
                  stars={boilerplate.stars}
                  forks={0}
                  author={{
                    name: boilerplate?.author?.name,
                    avatar: boilerplate?.author?.avatar
                  }}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}