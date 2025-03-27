'use client';

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, GitFork, Star } from "lucide-react";
import { fetchBoilerplateFiles, getBoilerplateById, BoilerplateFile } from "@/utils/boilerplateUtils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  id: string;
}

const CodeViewer = ({ id }: CodeViewerProps) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [files, setFiles] = useState<BoilerplateFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const boilerplate = id ? getBoilerplateById(id) : null;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchBoilerplateFiles(id)
        .then((fetchedFiles) => {
          setFiles(fetchedFiles);
          if (fetchedFiles.length > 0) {
            setActiveFile(fetchedFiles[0].id);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const activeFileData = files.find(file => file.id === activeFile);

  if (!boilerplate) {
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
              <CardTitle>{boilerplate?.title}</CardTitle>
              <CardDescription>{boilerplate.description}</CardDescription>
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
              {files.map((file) => (
                <TabsTrigger key={file.id} value={file.id}>
                  <FileCode className="mr-2 h-4 w-4" />
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((file) => (
              <TabsContent key={file.id} value={file.id}>
                <SyntaxHighlighter
                  language={file.language}
                  style={vscDarkPlus}
                  showLineNumbers
                >
                  {file.content}
                </SyntaxHighlighter>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeViewer;