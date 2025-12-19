describe("Pizza App - Home", () => {
  it("Home sayfası açılır ve sipariş butonu çalışır", () => {
    cy.visit("/");

    cy.get('[data-cy="home-page"]').should("exist");
    cy.get('[data-cy="hero"]').should("be.visible");

    cy.get('[data-cy="go-order"]')
      .should("be.visible")
      .and("contain", "ACIKTIM")
      .click();

    cy.location("pathname").should("eq", "/siparis");
  });
});