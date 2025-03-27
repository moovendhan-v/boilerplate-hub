import { Metadata } from 'next';
import CodeViewer from '@/components/CodeViewer';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `View Boilerplate ${params.id}`,
    description: 'View and explore boilerplate code details'
  };
}

export default function CodeViewerPage({ params }: Props) {
  return <CodeViewer id={params.id} />;
}