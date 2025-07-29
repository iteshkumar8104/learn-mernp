const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }
  return await response.json();
}

async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
}

function getAuthToken() {
  return localStorage.getItem('token');
}

async function getPages() {
  const response = await fetch(`${API_BASE_URL}/pages`);
  if (!response.ok) {
    throw new Error('Failed to fetch pages');
  }
  return await response.json();
}

async function getPageById(id) {
  const response = await fetch(`${API_BASE_URL}/pages/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch page');
  }
  return await response.json();
}

async function createOrUpdatePage(pageData) {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/pages`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(pageData)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save page');
  }
  return await response.json();
}

async function uploadMedia(file) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Media upload failed');
  }
  return await response.json();
}

async function getPageContent(id) {
  return getPageById(id);
}

export default {
  registerUser,
  loginUser,
  getPages,
  getPageById,
  getPageContent,
  createOrUpdatePage,
  uploadMedia
};
