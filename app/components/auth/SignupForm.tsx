'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignupForm() {
  const router = useRouter();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    clearError();
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 dark:text-gray-200">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 dark:text-gray-200">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        {(error || validationError) && (
          <div className="text-red-500 text-sm mt-2">
            {validationError || error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>

        <p className="text-center text-sm mt-4 dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}