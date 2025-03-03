
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitFork, Users, Star, Share2 } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen pb-20">
      <main className="container pt-24">
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Developer Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with other developers and share your boilerplates
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Work</CardTitle>
                <CardDescription>
                  Submit your own boilerplates to help other developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Submit Boilerplate
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Join Discussions</CardTitle>
                <CardDescription>
                  Engage with the community on development topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Browse Forums
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contribute</CardTitle>
                <CardDescription>
                  Help improve existing boilerplates through pull requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <GitFork className="mr-2 h-4 w-4" />
                  View Top Contributions
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Top Contributors</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={`https://github.com/github.png`} 
                      alt={`Contributor ${i}`}
                      className="h-16 w-16 rounded-full mb-3"
                    />
                    <h3 className="font-medium">Contributor {i}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {Math.floor(Math.random() * 50)} boilerplates
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 1000)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 200)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;
