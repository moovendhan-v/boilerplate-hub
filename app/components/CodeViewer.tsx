'use client';

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, GitFork, Star } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBoilerplateStore } from '@/store/boilerplate-store';

interface CodeViewerProps {
  id: string;
}

interface BoilerplateFile {
  id: string;
  name: string;
  content: string;
  language: string;
  path: string;
}

const CodeViewer = ({ id }: CodeViewerProps) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const { currentBoilerplate, loading, error, fetchBoilerplateDetails } = useBoilerplateStore();

  useEffect(() => {
    if (id) {
      fetchBoilerplateDetails(id);
      if (currentBoilerplate && currentBoilerplate?.files && currentBoilerplate?.files.length > 0) {
        setActiveFile(currentBoilerplate?.files[0].id);
      }
    }
  }, [id, fetchBoilerplateDetails]);

  if (loading) {
    return (
      <div className="container py-24">
        <Card>
          <CardContent className="pt-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-24">
        <Card>
          <CardContent className="pt-6">
            <p>Error: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentBoilerplate) {
    return (
      <div className="container py-24">
        <Card>
          <CardContent className="pt-6">
            <p>Boilerplate not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentBoilerplate?.name}</CardTitle>
              <CardDescription>{currentBoilerplate?.description}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                Star
              </Button>
              <Button variant="outline" size="sm">
                <GitFork className="mr-2 h-4 w-4" />
                Fork
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeFile || undefined} onValueChange={setActiveFile}>
            <TabsList className="mb-4">
              {/* {currentBoilerplate?.files.map((file) => (
                <TabsTrigger key={file.id} value={file.id}>
                  <FileCode className="mr-2 h-4 w-4" />
                  {file.name}
                </TabsTrigger>
              ))} */}
            </TabsList>
            {/* {currentBoilerplate?.files.map((file) => (
              <TabsContent key={file.id} value={file.id}>
                <SyntaxHighlighter
                  language={file.language}
                  style={vscDarkPlus}
                  showLineNumbers
                >
                  {file.content}
                </SyntaxHighlighter>
              </TabsContent>
            ))} */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeViewer;