describe('Roadmap', () => {
    beforeEach('passes', () => {
      cy.visit('https://orbital2-ten.vercel.app/login');
    });

    it('Checking of recommendation page', () => {
        cy.get('input[name="email"]').type('test1@gmail.com');
        cy.get('input[name="password"]').type('test1');
        cy.get('.btn').click();
        cy.contains('Recommendation').click();
    });
});