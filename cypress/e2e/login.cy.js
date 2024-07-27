describe('Login Screen', () => {
  beforeEach('passes', () => {
    cy.visit('https://orbital2-ten.vercel.app/login');
  });

  it('loads login page', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button').should('contain', 'Submit');
    cy.contains('Register').should('exist');
  });

  it('does not login with invalid credentials', () => {

    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: 'Incorrect password',
    }).as('loginRequest');

    //fill in the information and submit
    cy.get('input[name="email"]').type('test1@gmail.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('.btn').click();

    cy.wait('@loginRequest').then(() => {
      // Check if local storage does not have jwtToken set
      expect(localStorage.getItem('jwtToken')).to.be.null;
    });
  });

  it('login with valid credentials', () => {
    //fill in the information and submit
    cy.get('input[name="email"]').type('test1@gmail.com');
    cy.get('input[name="password"]').type('test1');
    cy.get('.btn').click();

    // Verify that user is redirected to /homepage
      cy.url().should('include', '/homepage');
      cy.get('h1').should('contain', 'Homepage');
  });


  it('Checking of Course Tracker, Roadmap, Useful Links, Recommendation Routing', () => {
    cy.get('input[name="email"]').type('test1@gmail.com');
    cy.get('input[name="password"]').type('test1');
    cy.get('.btn').click();
    cy.contains('Course Tracker').click();
    cy.url().should('include', '/homepage/coursetracker');
    cy.contains('Roadmap').click();
    cy.url().should('include', '/homepage/suggestedroadmap');
    cy.contains('Useful Links').click();
    cy.url().should('include', '/homepage/usefullinks');
    cy.contains('Recommendation').click();
    cy.url().should('include', '/homepage/recommendation');
  });


})