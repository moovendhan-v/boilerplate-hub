'use client';

import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitFork, Users, Star, Share2 } from "lucide-react";

export default function CommunityPage() {
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
                  Help improve existing boilerplates through contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <GitFork className="mr-2 h-4 w-4" />
                  Start Contributing
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}