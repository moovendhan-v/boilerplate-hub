
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpRight, Code, Bookmark, TrendingUp, Star, GitFork } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Sample categories for the filter dropdown
const categories = [
  "Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Data Science", "Machine Learning", "Blockchain"
];

// Sample featured boilerplates with more detailed data
const featuredBoilerplates = [
  {
    id: "1",
    title: "Next.js Dashboard Starter",
    description: "Full-stack Next.js 14 template with authentication, database, and beautiful UI components",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop",
    stars: 1245,
    forks: 289,
    category: "Frontend",
    tags: ["next.js", "tailwind", "typescript", "prisma"],
    author: {
      name: "Sarah Chen",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "2",
    title: "React Native Starter Kit",
    description: "Full-featured React Native template with auth flows, UI kit, and navigation",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=280&fit=crop",
    stars: 896,
    forks: 152,
    category: "Mobile",
    tags: ["react-native", "expo", "authentication", "redux"],
    author: {
      name: "Mike Johnson",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "3",
    title: "FastAPI Backend Template",
    description: "Production-ready FastAPI backend with authentication, database, and OpenAPI docs",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=280&fit=crop",
    stars: 715,
    forks: 123,
    category: "Backend",
    tags: ["python", "fastapi", "sqlalchemy", "docker"],
    author: {
      name: "Alex Wong",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "4",
    title: "MERN Stack E-commerce",
    description: "Complete e-commerce solution with React, Express, MongoDB and Node.js",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=280&fit=crop",
    stars: 632,
    forks: 98,
    category: "Full Stack",
    tags: ["mongodb", "express", "react", "node"],
    author: {
      name: "Jessica Liu",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "5",
    title: "Docker Django Starter",
    description: "Containerized Django setup with PostgreSQL, Redis, and Celery for async tasks",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&h=280&fit=crop",
    stars: 543,
    forks: 87,
    category: "DevOps",
    tags: ["django", "docker", "postgresql", "redis"],
    author: {
      name: "David Park",
      avatar: "https://github.com/github.png",
    },
  },
  {
    id: "6",
    title: "Vue 3 Enterprise Boilerplate",
    description: "Scalable Vue 3 architecture for enterprise applications with Composition API",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=500&h=280&fit=crop",
    stars: 421,
    forks: 75,
    category: "Frontend",
    tags: ["vue", "typescript", "pinia", "vite"],
    author: {
      name: "Emily Rodriguez",
      avatar: "https://github.com/github.png",
    },
  }
];

// Trending repositories
const trendingRepos = [
  {
    id: "7",
    title: "T3 Stack Starter",
    description: "Type-safe full-stack template with Next.js, tRPC, Prisma, and Tailwind",
    stars: 2345,
    forks: 412,
    category: "Full Stack",
    growth: "+345 stars this week",
  },
  {
    id: "8",
    title: "SvelteKit Auth Template",
    description: "Authentication and authorization for SvelteKit applications",
    stars: 1432,
    forks: 213,
    category: "Frontend",
    growth: "+289 stars this week",
  },
  {
    id: "9",
    title: "Go Microservices Framework",
    description: "Framework for building microservices with Go and gRPC",
    stars: 987,
    forks: 165,
    category: "Backend",
    growth: "+156 stars this week",
  },
];

const Explore = () => {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-muted-foreground">
            Discover trending code examples, templates, and open source projects
          </p>
        </div>

        {/* Enhanced search with filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates, projects, or code..."
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-background text-foreground border border-input rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs for different content types */}
        <Tabs defaultValue="featured" className="space-y-4">
          <TabsList className="w-full sm:w-auto justify-start">
            <TabsTrigger value="featured" className="flex gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Featured</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex gap-1">
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex gap-1">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          </TabsList>

          {/* Featured tab content */}
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBoilerplates.map((boilerplate) => (
                <Card key={boilerplate.id} className="card-hover overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {boilerplate.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{boilerplate.title}</CardTitle>
                    <CardDescription>{boilerplate.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={boilerplate.image} 
                        alt={boilerplate.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 pt-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {boilerplate.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={boilerplate.author.avatar}
                            alt={boilerplate.author.name}
                            className="h-6 w-6 rounded-full"
                          />
                          <span className="text-xs text-muted-foreground">{boilerplate.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{boilerplate.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            <span>{boilerplate.forks}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/30 py-2 px-4">
                    <div className="w-full flex justify-between items-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/code/${boilerplate.id}`}>
                          <span>View Details</span>
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trending tab content */}
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingRepos.map((repo) => (
                <Card key={repo.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {repo.category}
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        {repo.growth}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{repo.title}</CardTitle>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t py-2">
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/code/${repo.id}`}>
                        <span>View Details</span>
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New projects tab */}
          <TabsContent value="new" className="mt-6">
            <div className="text-center py-8">
              <Code className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">New Projects</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Discover the latest boilerplates and code templates added by our community.
              </p>
              <Button>
                Explore New Projects
              </Button>
            </div>
          </TabsContent>

          {/* Saved projects tab */}
          <TabsContent value="saved" className="mt-6">
            <div className="text-center py-8">
              <Bookmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Your Saved Items</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                You haven't saved any boilerplates yet. Browse our featured templates and save the ones you like.
              </p>
              <Button>
                Browse Templates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Explore;
