describe('EduLearn MERN App End-to-End Tests', () => {
  const timestamp = Date.now();
  const userEmail = `testuser${timestamp}@example.com`;
  const adminEmail = `adminuser${timestamp}@example.com`;
  const userPassword = 'password123';
  let authToken = '';
  let adminAuthToken = '';

  it('Registers a new user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/register',
      body: {
        name: 'Test User',
        email: userEmail,
        password: userPassword,
        role: 'student'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 201, 409]).to.include(response.status);
      // 409 means user already exists, which is acceptable for repeated tests
    });
  });

  it('Registers an admin user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/register',
      body: {
        name: 'Admin User',
        email: adminEmail,
        password: userPassword,
        role: 'admin'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 201, 409]).to.include(response.status);
    });
  });

  it('Logs in the user and gets token', () => {
    cy.request('POST', 'http://localhost:5000/api/auth/login', {
      email: userEmail,
      password: userPassword
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      authToken = response.body.token;
    });
  });

  it('Logs in the admin user and gets token', () => {
    cy.request('POST', 'http://localhost:5000/api/auth/login', {
      email: adminEmail,
      password: userPassword
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      adminAuthToken = response.body.token;
    });
  });

  let createdPageId = '';

  it('Creates a new page as admin', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/pages',
      headers: {
        Authorization: `Bearer ${adminAuthToken}`
      },
      body: {
        title: 'Test Page',
        content: 'This is a test page content.'
      }
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property('title', 'Test Page');
      createdPageId = response.body._id;
    });
  });

  it('Loads the home page', () => {
    cy.visit('/');
    cy.contains('EduLearn');
    cy.contains('Home');
    cy.contains('Courses');
  });

  let uiTestEmail = `uitestuser${timestamp}@example.com`;
  let uiTestPassword = 'password123';

  it('Registers via UI', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type('UI Test User');
    cy.get('input[name="email"]').type(uiTestEmail);
    cy.get('input[name="password"]').type(uiTestPassword);
    cy.get('select[name="role"]').select('student');
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="register-success-notification"]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Registration successful! Please login.');
  });

  it('Logs in via UI', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(uiTestEmail);
    cy.get('input[name="password"]').type(uiTestPassword);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 25000 }).should('include', '/dashboard');
    cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
  });

  it('Views a page content', () => {
    cy.visit(`/page/${createdPageId}`);
    cy.contains('Test Page').should('exist');
  });
});
