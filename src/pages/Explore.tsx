
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpRight } from "lucide-react";

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

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates, projects, or code..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Card 1 */}
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Next.js Dashboard Starter</CardTitle>
              <CardDescription>Full-stack Next.js 14 template with authentication and database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-muted overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop" 
                  alt="Next.js Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">1.2k stars</div>
              <Button size="sm" variant="ghost" className="gap-1">
                View <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          {/* Featured Card 2 */}
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">React Native Starter Kit</CardTitle>
              <CardDescription>Full-featured React Native template with auth flows and UI kit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-muted overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=280&fit=crop" 
                  alt="React Native Starter" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">896 stars</div>
              <Button size="sm" variant="ghost" className="gap-1">
                View <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          {/* Featured Card 3 */}
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">FastAPI Backend Template</CardTitle>
              <CardDescription>Production-ready FastAPI backend with authentication and database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md bg-muted overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=280&fit=crop" 
                  alt="FastAPI Template" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">715 stars</div>
              <Button size="sm" variant="ghost" className="gap-1">
                View <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Explore;
