'use client';

import { useEffect, useState } from 'react';
import { useBoilerplateStore } from '@/store/boilerplate-store';
import { graphqlClient } from '@/lib/api-client';
import { GET_BOILERPLATE_DETAILS } from '@/lib/graphql-queries';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface BoilerplateDetailProps {
  id: string;
}

interface FileDetail {
  name: string;
  path: string;
  content: string;
  type: string;
}

export default function BoilerplateDetail({ id }: BoilerplateDetailProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await graphqlClient(GET_BOILERPLATE_DETAILS, { id });
        setDetails(data.boilerplate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return <div>No details found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{details.name}</h1>
          <p className="text-gray-600 mt-2">{details.description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary">{details.stars} Stars</Badge>
          <Badge variant="secondary">{details.downloads} Downloads</Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge>{details.framework}</Badge>
        <Badge>{details.language}</Badge>
        {details.tags.map((tag: string) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={details.author.avatar}
            alt={details.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{details.author.name}</p>
            <p className="text-sm text-gray-500">
              Created: {new Date(details.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Files</h2>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <Accordion type="single" collapsible className="w-full">
            {details.files.map((file: FileDetail) => (
              <AccordionItem key={file.path} value={file.path}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center space-x-2">
                    <span>{file.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {file.type}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{file.content}</code>
                  </pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  );
}