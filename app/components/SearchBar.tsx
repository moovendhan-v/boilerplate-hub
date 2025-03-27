'use client'

import { Search } from "lucide-react";
import { useBoilerplateStore } from "@/store/store";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useBoilerplateStore();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search boilerplates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/20"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};