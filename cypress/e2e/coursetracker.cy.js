describe('Course Tracker', () => {
    beforeEach(() => {
      cy.visit('https://orbital2-ten.vercel.app/login');
    });

    it('Checking of course tracker page', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Course Tracker').click();

        cy.get('h2').should('contain', 'Select an option:');
        cy.get('#dropdown').should('exist');

        // Check the presence of buttons
        cy.get('button').contains('Save Selection').should('exist');
        cy.get('button').contains('Delete All').should('exist');
    });
    
    it('should render the correct component based on dropdown selection', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Course Tracker').click();

        // Select CS option and verify the correct component is rendered
        cy.get('#dropdown').select('CS');
        cy.get('table').should('exist');
    
        cy.get('#dropdown').select('BZA');
        cy.get('table').should('exist'); 

        cy.get('#dropdown').select('INFO SYS');
        cy.get('table').should('exist');

        cy.get('#dropdown').select('INFO SEC');
        cy.get('table').should('exist');
    });

});