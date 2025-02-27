
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Code, Eye, GitBranch, Star, Users, Ellipsis } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>New Project</Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Code className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
              <Star className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">578</div>
              <p className="text-xs text-muted-foreground">
                +21 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Forks</CardTitle>
              <GitBranch className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">129</div>
              <p className="text-xs text-muted-foreground">
                +9 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Views</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,792</div>
              <p className="text-xs text-muted-foreground">
                +412 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Tabs */}
        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Projects</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Project Card 1 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">React Shopping Cart</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>E-commerce cart with state management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      Updated 2d ago
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      3 contributors
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Card 2 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Next.js Portfolio</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Personal portfolio with dark mode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      Updated 5d ago
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      1 contributor
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Card 3 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">Authentication API</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>JWT authentication with Express.js</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      Updated 1w ago
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-3 w-3" />
                      2 contributors
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="popular" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Popular projects would go here */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">React UI Library</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Component library with Storybook</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      256 stars
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="mr-1 h-3 w-3" />
                      48 forks
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="starred" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Starred projects would go here */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">TailwindCSS Templates</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Ellipsis className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>Collection of responsive templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      Starred 2w ago
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
