describe('Post card testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should increment and decrement vote count', () => {
    cy.get('#post-4').within(() => {
      cy.get('.vote-count')
        .invoke('text')
        .then((initialVoteCount) => {
          const initialCount = parseInt(initialVoteCount, 10);

          cy.get('.upvote-button').click();
          cy.get('.vote-count').should('contain.text', initialCount + 1);

          cy.get('.downvote-button').click();
          cy.get('.vote-count').should('contain.text', initialCount);
        });
    });
  });
});
