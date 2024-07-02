describe('FormPage', () => {
  beforeEach(() => {
    cy.visit(`/en/create-post`);
  });

  it('Go to the create post page', () => {
    cy.get('h1').contains('Create Post');
  });

  it('Check form for case: isText', () => {
    cy.get('textarea[name="title"]').type('ryan');
    cy.get('textarea[name="text"]').type('gosling');
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', 'create-post');
    cy.contains('ryan');
    cy.contains('gosling');
  });

  it('Validate form input, name = title', () => {
    cy.get('button[type="submit"]').click();

    cy.get('textarea[name="title"]').should('have.focus');

    cy.get('p').contains('Please fill out this field.').should('be.visible');
  });
  it('Check form for case: isImage', () => {
    cy.get('#buttonPhoto').click();
    cy.get('textarea[name="title"]').type('john');
    cy.get('#inputImage').selectFile('cypress/downloads/ww.jpg', { force: true, action: 'select' });

    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', 'create-post');
    cy.contains('john');
  });
});
