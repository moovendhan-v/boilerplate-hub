
import React, { useState } from "react";
import { BoilerplateCard } from "@/components/BoilerplateCard";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { categories, getBoilerplatesByCategory } from "@/utils/boilerplateUtils";

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const boilerplates = getBoilerplatesByCategory(activeCategory);

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
              variant={activeCategory === null ? "default" : "outline"} 
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"} 
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        {/* Boilerplates Grid */}
        <section className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boilerplates.map((boilerplate) => (
              <BoilerplateCard key={boilerplate.id} {...boilerplate} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Explore;
