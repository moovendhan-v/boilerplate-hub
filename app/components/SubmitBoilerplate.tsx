'use client';

import { useState } from 'react';
import { useBoilerplateStore } from '@/store/boilerplate-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const frameworks = [
  'React',
  'Vue',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'Svelte',
  'Express',
  'NestJS',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel'
];

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust'
];

interface SubmitBoilerplateFormData {
  name: string;
  description: string;
  tags: string[];
  framework: string;
  language: string;
}

export default function SubmitBoilerplate() {
  const { createBoilerplate, loading } = useBoilerplateStore();
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    tags: '',
    framework: '',
    language: ''
  });

  console.log('[IsAuthanticated]', isAuthenticated);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      description: '',
      tags: '',
      framework: '',
      language: ''
    };

    console.log('[SubmitBoilerplate] Validating form data:', formData);

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      isValid = false;
    }

    if (!formData.framework) {
      newErrors.framework = 'Framework is required';
      isValid = false;
    }

    if (!formData.language) {
      newErrors.language = 'Language is required';
      isValid = false;
    }

    console.log('[SubmitBoilerplate] Validation result:', { isValid, errors: newErrors });
    setErrors(newErrors);
    return isValid;
  };
  const [formData, setFormData] = useState<SubmitBoilerplateFormData>({
    name: '',
    description: '',
    tags: [],
    framework: '',
    language: ''
  });

  // Handle authentication check and redirect
  useEffect(() => {
    const checkAuth = () => {
      console.log('[SubmitBoilerplate] Checking authentication status...');
      const currentState = useAuthStore.getState();

      if (!currentState.isAuthenticated) {
        console.log('[SubmitBoilerplate] User not authenticated, redirecting to login...');
        useAuthStore.getState().setReturnUrl('/submit');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log('[SubmitBoilerplate] Form input changed:', { field: name, value });
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SubmitBoilerplate] Form submission started');
    
    if (!user) {
      console.log('[SubmitBoilerplate] Submission failed: User not found');
      return;
    }

    if (!validateForm()) {
      console.log('[SubmitBoilerplate] Submission failed: Form validation failed', errors);
      return;
    }

    try {
      console.log('[SubmitBoilerplate] Creating boilerplate with data:', {
        ...formData,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        }
      });

      const createBoilerplateResp = await createBoilerplate({
        ...formData,
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || ''
        }
      });

      console.log('[SubmitBoilerplate] Create boilerplate response:', createBoilerplateResp);

      console.log('[SubmitBoilerplate] Boilerplate created successfully');

      toast({
        title: 'Success!',
        description: 'Boilerplate submitted successfully',
        variant: 'default'
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        description: '',
        tags: [],
        framework: '',
        language: ''
      });

      console.log('[SubmitBoilerplate] Redirecting to dashboard');
      router.push('/dashboard');
    } catch (err) {
      console.error('[SubmitBoilerplate] Error creating boilerplate:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit boilerplate. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Submit New Boilerplate</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter boilerplate name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            rows={4}
            placeholder="Describe your boilerplate"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.tags ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="react, typescript, starter"
          />
          {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags}</p>}
        </div>

        <div>
          <label htmlFor="framework" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Framework
          </label>
          <select
            id="framework"
            name="framework"
            value={formData.framework}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.framework ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a framework</option>
            {frameworks.map(framework => (
              <option key={framework} value={framework}>{framework}</option>
            ))}
          </select>
          {errors.framework && <p className="mt-1 text-sm text-red-500">{errors.framework}</p>}
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.language ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a language</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
          {errors.language && <p className="mt-1 text-sm text-red-500">{errors.language}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Boilerplate'}
        </Button>
      </form>
    </div>
  );
}