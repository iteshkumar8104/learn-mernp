const API_URL = 'http://localhost:5000/api';

const BackendAPI = {
  registerUser: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
  },

  loginUser: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
  },

  fetchPages: async () => {
    const response = await fetch(`${API_URL}/pages`);
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    return response.json();
  },

  fetchPageById: async (id) => {
    const response = await fetch(`${API_URL}/pages/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }
    return response.json();
  },

  savePage: async (pageData, token) => {
    const response = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pageData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save page');
    }
    return response.json();
  },

  uploadMedia: async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload media');
    }
    return response.json();
  },
};

export default BackendAPI;
