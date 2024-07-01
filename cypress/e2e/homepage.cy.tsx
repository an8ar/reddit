describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('header').should('be.visible');

    cy.get('nav').should('be.visible');

    cy.get('aside').should('be.visible');
  });

  it('should load the homepage correctly', () => {
    cy.get('section').should('be.visible').should('not.be.null');
  });

  it('should navigate to popular page', () => {
    cy.get('a[href*="popular"]').click();

    cy.contains('popular');
  });

  it('should navigate to all page', () => {
    cy.get('a[href*="all"]').click();

    cy.contains('all');
  });
});
