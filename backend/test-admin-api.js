// test-admin-api.js
// Node.js script to test admin login and create a page using JWT

const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';
const adminCredentials = {
  email: 'adminuser@example.com',
  password: 'AdminPass123',
};

async function loginAndCreatePage() {
  const start = Date.now();
  // Login as admin
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(adminCredentials),
    // No cache for fastest response
    cache: 'no-store',
  });
  const loginData = await loginRes.json();
  if (!loginRes.ok) {
    console.error('Login failed:', loginData);
    return;
  }
  const token = loginData.token;
  console.log('Admin login successful. JWT:', token);

  // Create a new page as soon as login completes
  const pageStart = Date.now();
  const pageRes = await fetch(`${API_URL}/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: 'Admin API Test Page',
      content: 'This page was created by the admin via Node.js script.'
    }),
    cache: 'no-store',
  });
  const pageData = await pageRes.json();
  if (!pageRes.ok) {
    console.error('Page creation failed:', pageData);
    return;
  }
  const pageEnd = Date.now();
  console.log('Page created successfully:', pageData);
  const end = Date.now();
  console.log(`Total test time: ${end - start} ms (login: ${pageStart - start} ms, page creation: ${pageEnd - pageStart} ms)`);
}

loginAndCreatePage().catch(console.error);
