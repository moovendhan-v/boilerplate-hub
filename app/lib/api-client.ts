import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const graphqlClient = async (query: string, variables?: any) => {
  try {
    const response = await apiClient.post('/graphql', {
      query,
      variables,
    });

    // Check content type
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type received:', contentType);
      console.error('Response data:', response.data);
      throw new Error('Server returned invalid content type. Expected JSON but received: ' + contentType);
    }

    const { data } = response;
    console.log('GraphQL Response:', { data, contentType });

    // Store token if it's a login response
    if (data?.data?.login?.token) {
      localStorage.setItem('auth_token', data.data.login.token);
    }

    if (data.errors) {
      const errorMessage = data.errors[0].message || 'GraphQL Error';
      const errorDetails = data.errors[0].extensions?.code || '';
      throw new Error(`${errorMessage}${errorDetails ? ` (${errorDetails})` : ''}`);
    }

    return data.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      const message = error.response.data?.message || 'Server error';
      throw new Error(`API Error: ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server');
    } else {
      // Error in request setup
      throw new Error(error.message || 'Unexpected error');
    }
  }
};

export default apiClient;