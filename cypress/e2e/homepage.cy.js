describe('Homepage', () => {
    beforeEach('passes', () => {
      cy.visit('https://orbital2-ten.vercel.app/homepage');
    });



    it('should display the sidebar links and main content', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();

        // Check that the sidebar links are present and have the correct text
        cy.get('.sidebar .list-group-item').should('have.length', 4); 
        cy.get('a[href="/homepage/coursetracker"]').should('contain', 'Course Tracker');
        cy.get('a[href="/homepage/suggestedroadmap"]').should('contain', 'Suggested Roadmap');
        cy.get('a[href="/homepage/usefullinks"]').should('contain', 'Useful Links');
        cy.get('a[href="/homepage/recommendation"]').should('contain', 'Recommendation');

        cy.get('.content').within(() => {
            cy.get('h2').should('contain', 'Welcome!');
            cy.get('p').eq(0).should('contain', 'Course Tracker - To keep track of your modules left');
            cy.get('p').eq(1).should('contain', 'Suggested Roadmap - Give a general idea on how to clear your modules during university');
            cy.get('p').eq(2).should('contain', 'Useful Links - Links to various websites that are important for SOC students');
          });
      });

});