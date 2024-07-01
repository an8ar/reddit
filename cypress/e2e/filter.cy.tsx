describe('Filter Component', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should open the filter dropdown', () => {
    cy.get('#filter-button').click();

    cy.get('#filter-form').should('be.visible');
  });
});
