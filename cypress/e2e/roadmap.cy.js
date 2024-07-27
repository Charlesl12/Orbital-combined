describe('Roadmap', () => {
    beforeEach('passes', () => {
      cy.visit('https://orbital2-ten.vercel.app/login');
    });

    it('Checking of roadmap page', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Roadmap').click();
    });
    
    it('Should display correct content on Roadmap page', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Roadmap').click();
        cy.contains('CS').click(); 
        cy.contains('NOTE: this is just a sample roadmap').should('be.visible');

        cy.get('img[alt="CS Roadmap"]').should('be.visible').and((img) => {
            expect(img[0].naturalWidth).to.be.greaterThan(0);
        });

        cy.contains('BZA').click();
        cy.contains('NOTE: this is just a sample roadmap').should('be.visible');
        cy.get('img[alt="BZA Roadmap"]').should('be.visible').and((img) => {
            expect(img[0].naturalWidth).to.be.greaterThan(0);
        });

        cy.contains('InfoSys').click();
        cy.contains('NOTE: this is just a sample roadmap').should('be.visible');
        cy.contains('Link to Google Form').should('have.attr', 'href', 'https://docs.google.com/spreadsheets/d/1JrTv3gMZeKl5XpI-Af4JqqZfsj5vRGQZgWKXQSPg6Ac/edit?ref=tayjeanyee.com&gid=273525867#gid=273525867');

    });

});