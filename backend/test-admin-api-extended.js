// test-admin-api-extended.js
// Node.js script to test admin and user flows: register, login, fetch pages, create page, upload (mocked)

const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const API_URL = 'http://localhost:5000/api';

async function registerUser(name, email, password, role = 'student') {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });
  return res.json();
}

async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function fetchPages() {
  const res = await fetch(`${API_URL}/pages`);
  return res.json();
}

async function createPage(token, title, content) {
  const res = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

async function uploadMedia(token) {
  // This is a mock upload, replace 'test.png' with a real file if needed
  const form = new FormData();
  form.append('file', fs.createReadStream(__filename), { filename: 'test.txt' });
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  return res.json();
}

(async () => {
  // Register and login as a normal user
  const userEmail = 'testuser_' + Date.now() + '@example.com';
  const userPassword = 'UserPass123';
  await registerUser('Test User', userEmail, userPassword);
  const userLogin = await loginUser(userEmail, userPassword);
  console.log('User login:', userLogin);

  // Register and login as admin
  const adminEmail = 'adminuser@example.com';
  const adminPassword = 'AdminPass123';
  const adminLogin = await loginUser(adminEmail, adminPassword);
  console.log('Admin login:', adminLogin);

  // Fetch pages
  const pages = await fetchPages();
  console.log('Pages:', pages);

  // Create page as admin
  if (adminLogin.token) {
    const newPage = await createPage(adminLogin.token, 'Extended API Test Page', 'Created by extended script.');
    console.log('Admin created page:', newPage);
  }

  // Upload media as admin (mocked file)
  if (adminLogin.token) {
    try {
      const uploadResult = await uploadMedia(adminLogin.token);
      console.log('Admin uploaded media:', uploadResult);
    } catch (e) {
      console.log('Media upload failed (expected if no upload endpoint or file):', e.message);
    }
  }
})();
