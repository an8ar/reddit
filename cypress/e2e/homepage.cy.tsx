describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage correctly', () => {
    cy.get('header').should('be.visible');
    cy.get('nav').should('be.visible');
    cy.get('aside').should('be.visible');
    cy.get('section').should('be.visible').should('not.be.null');
  });
});
