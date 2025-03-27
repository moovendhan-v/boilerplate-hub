import { Metadata } from 'next';
import Dashboard from '@/components/Dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your boilerplates and account settings',
};

export default function DashboardPage() {
  return <Dashboard />;
}