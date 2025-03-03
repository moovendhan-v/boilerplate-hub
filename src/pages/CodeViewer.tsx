
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileCode, GitFork, Star } from "lucide-react";
import { fetchBoilerplateFiles, getBoilerplateById, BoilerplateFile } from "@/utils/boilerplateUtils";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = () => {
  const { id } = useParams<{ id: string }>();
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
    <div className="container py-24">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{boilerplate.title}</CardTitle>
              <CardDescription>{boilerplate.description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                {boilerplate.stars}
              </Button>
              <Button variant="outline" size="sm">
                <GitFork className="mr-2 h-4 w-4" />
                {boilerplate.forks}
              </Button>
              <Button variant="default" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-secondary px-2 py-1 rounded">
              {boilerplate.language}
            </span>
            <span className="text-xs bg-secondary px-2 py-1 rounded">
              {boilerplate.category}
            </span>
          </div>
        </CardHeader>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p>Loading files...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Tabs defaultValue={activeFile || ""} onValueChange={setActiveFile}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {files.map((file) => (
                <TabsTrigger key={file.id} value={file.id} className="flex items-center">
                  <FileCode className="mr-2 h-4 w-4" />
                  {file.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {files.map((file) => (
              <TabsContent key={file.id} value={file.id} className="border rounded-md mt-4">
                <div className="p-2 bg-muted text-xs flex justify-between items-center border-b">
                  <span>{file.path}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3 mr-1" /> Download
                  </Button>
                </div>
                <SyntaxHighlighter
                  language={file.language}
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{ margin: 0, borderRadius: '0 0 0.5rem 0.5rem' }}
                >
                  {file.content}
                </SyntaxHighlighter>
              </TabsContent>
            ))}
          </Tabs>
          
          {boilerplate.readme && (
            <CardContent className="mt-6">
              <CardTitle className="text-lg mb-4">README</CardTitle>
              <div className="prose prose-sm max-w-none dark:prose-invert bg-muted p-4 rounded-md">
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {boilerplate.readme}
                </pre>
              </div>
            </CardContent>
          )}
        </CardContent>
      )}
    </div>
  );
};

export default CodeViewer;
