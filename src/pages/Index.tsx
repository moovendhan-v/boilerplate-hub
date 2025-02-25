
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <main className="container pt-24 pb-20">
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
      </main>
    </div>
  );
};

export default Index;
