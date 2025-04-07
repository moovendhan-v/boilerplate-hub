import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const graphqlClient = async (query: string, variables?: any) => {
  try {
    const { data } = await apiClient.post('/graphql', {
      query,
      variables,
    });

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;