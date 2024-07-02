describe('FormPage', () => {
  beforeEach(() => {
    cy.visit(`/en/create-post`);
  });
  it('Go to the create post page', () => {
    cy.get('h1').contains('Create Post');
  });
  it('Check form case: isText', () => {
    cy.get('textarea[name="title"]').type('ryan');
    cy.get('textarea[name="text"]').type('gosling');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', 'create-post');
    cy.contains('ryan');
    cy.contains('gosling');
  });
});
