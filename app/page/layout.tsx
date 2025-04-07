import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boilerplate Hub - Home',
  description: 'Discover and share boilerplate code for your next project',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}