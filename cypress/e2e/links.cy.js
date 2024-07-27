describe('Roadmap', () => {
    beforeEach('passes', () => {
      cy.visit('https://orbital2-ten.vercel.app/login');
    });

    it('Checking of links page', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Useful Links').click();
    });

    it('Check content of links page', () => {

    });

    it('Should open all links in a new tab', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Useful Links').click();
        const links = [
            { url: 'https://nusmods.com/courses', name: 'NUSMODS (CLICK ME)' },
            { url: 'https://myedurec.nus.edu.sg', name: 'Edurec (CLICK ME)' },
            { url: 'https://www.nus.edu.sg/canvas/login/', name: 'Canvas web (CLICK ME)' },
            { url: 'https://www.google.com/search?q=canvas+student+download', name: 'Canvas Mobile App (CLICK ME)' },
            { url: 'https://univus.nus.edu.sg/', name: 'Univus (CLICK ME)' },
            { url: 'https://www.google.com/search?q=NUS+NextBus', name: 'NUS NextBus' }
        ];

        links.forEach(link => {
            cy.contains(link.name).should('have.attr', 'href', link.url);
            cy.contains(link.name).should('have.attr', 'target', '_blank');
        });
    });

});