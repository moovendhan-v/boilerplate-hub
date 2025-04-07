'use client';

import React, { useEffect } from "react";
import { BoilerplateCard } from "@/components/BoilerplateCard";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { categories } from "@/utils/boilerplateUtils";
import { useBoilerplateStore } from '@/store/boilerplate-store';

export default function ExplorePage() {
  const { 
    boilerplates, 
    loading, 
    error, 
    fetchBoilerplates,
    selectedCategory,
    setSelectedCategory 
  } = useBoilerplateStore();

  useEffect(() => {
    fetchBoilerplates();
  }, [fetchBoilerplates]);

  return (
    <div className="min-h-screen pb-20">
      <main className="container pt-24">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Explore Boilerplates
            </h1>
            <p className="text-lg text-muted-foreground">
              Find the perfect boilerplate for your next project
            </p>
          </div>
          <SearchBar />
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"} 
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Loading and Error States */}
        {loading && (
          <div className="mt-8 text-center">
            <p className="text-lg text-muted-foreground">Loading boilerplates...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-red-500">
            <p className="text-lg">Error: {error}</p>
          </div>
        )}

        {/* Boilerplates Grid */}
        {!loading && !error && boilerplates && (
          <section className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {boilerplates
                .filter(boilerplate => 
                  !selectedCategory || boilerplate.tags.includes(selectedCategory)
                )
                .map((boilerplate) => (
                  <BoilerplateCard 
                    key={boilerplate.id} 
                    {...boilerplate}
                    forks={0} // Adding missing forks prop with default value
                  />
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}