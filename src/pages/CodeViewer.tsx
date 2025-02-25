
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Download, GitFork, Star, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const sampleCode = `// Next.js API Route with TypeScript
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}`;

const CodeViewer = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Next.js API Route Boilerplate</h1>
            <p className="text-muted-foreground">
              A simple API route handler for Next.js applications
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Star
            </Button>
            <Button variant="outline" size="sm">
              <GitFork className="w-4 h-4 mr-2" />
              Fork
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>245 stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>32 forks</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>1.2k views</span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="relative rounded-lg overflow-hidden border">
          <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
            <span className="text-sm font-medium">pages/api/hello.ts</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="p-4 bg-muted/50">
            <SyntaxHighlighter
              language="typescript"
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
              }}
            >
              {sampleCode}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-muted-foreground">
            This boilerplate provides a starting point for creating API routes in Next.js applications.
            It includes TypeScript types for request and response handling, making it type-safe and
            easier to maintain. Use this template when you need to create new API endpoints in your
            Next.js project.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-2">Features</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>TypeScript support out of the box</li>
            <li>Proper type definitions for Next.js API handlers</li>
            <li>Basic error handling structure</li>
            <li>Clean and minimal implementation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeViewer;
