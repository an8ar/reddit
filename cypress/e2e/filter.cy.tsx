describe('Filter Component', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should open the filter dropdown', () => {
    cy.get('#filter-button').click();

    cy.get('#filter-form').should('be.visible');
  });

  it('should toggle isText checkbox and update the URL', () => {
    cy.get('#filter-button').click();

    cy.get('#checkbox-isText').click().should('have.attr', 'aria-checked', 'true');
    cy.url().should('include', 'isText=true');

    cy.get('#checkbox-isText').click().should('have.attr', 'aria-checked', 'false');
    cy.url().should('not.include', 'isText=true');
  });
  it('should toggle isImage checkbox and update the URL', () => {
    cy.get('#filter-button').click();

    cy.get('#checkbox-isImage').click().should('have.attr', 'aria-checked', 'true');
    cy.url().should('include', 'isImage=true');

    cy.get('#checkbox-isImage').click().should('have.attr', 'aria-checked', 'false');
    cy.url().should('not.include', 'isImage=true');
  });

  it('should toggle isLink checkbox and update the URL', () => {
    cy.get('#filter-button').click();

    cy.get('#checkbox-isLink').click().should('have.attr', 'aria-checked', 'true');
    cy.url().should('include', 'isLink=true');

    cy.get('#checkbox-isLink').click().should('have.attr', 'aria-checked', 'false');
    cy.url().should('not.include', 'isLink=true');
  });
});
