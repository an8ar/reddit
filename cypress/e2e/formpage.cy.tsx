describe('FormPage', () => {
  beforeEach(() => {});
  it('Go to the create post page', () => {
    cy.visit(`/en/create-post`);

    cy.get('h1').contains('Create Post');
  });
});
