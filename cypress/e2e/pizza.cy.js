describe("Teknolojik Yemekler - Pizza", () => {
  const goToOrder = () => {
    cy.visit("/");
    cy.get('[data-cy="go-order"]').should("be.visible").click();
    cy.location("pathname").should("eq", "/siparis");
    cy.get('[data-cy="order-page"]').should("exist");
  };

  it("1) Inputa metin girilebilmeli (en az 3 karakter)", () => {
    goToOrder();

    cy.get('[data-cy="name-input"]').as("name");

    cy.get("@name").clear().type("ab");
    cy.get('[data-cy="submit-order"]').should("be.disabled");
    cy.get("@name").clear().type("abc");
    cy.get("@name").should("have.value", "abc");
  });

  it("2) Birden fazla malzeme seçilebilmeli (en az 4)", () => {
    goToOrder();

    cy.get('[data-cy="topping-0"]').check({ force: true });
    cy.get('[data-cy="topping-1"]').check({ force: true });
    cy.get('[data-cy="topping-2"]').check({ force: true });
    cy.get('[data-cy="topping-3"]').check({ force: true });

    cy.get('[data-cy="topping-0"]').should("be.checked");
    cy.get('[data-cy="topping-1"]').should("be.checked");
    cy.get('[data-cy="topping-2"]').should("be.checked");
    cy.get('[data-cy="topping-3"]').should("be.checked");
  });

  it("3) Form işlevsel ve success sayfasına geçiyor", () => {
    goToOrder();

    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: "12345",
        createdAt: "2025-12-19T00:00:00.000Z",
        fullName: "Test Kullanıcı",
        pizza: "Position Absolute Acı Pizza",
        size: "Orta",
        dough: "ince",
        toppings: ["Pepperoni", "Tavuk Izgara", "Mısır", "Sarımsak"],
        note: "",
        quantity: 1,
        selectionsTotal: 20,
        total: 105.5,
      },
    }).as("pizzaPost");

    cy.get('[data-cy="name-input"]').clear().type("Test Kullanıcı");

    cy.get('[data-cy="size-orta"]').check({ force: true });

    cy.get('[data-cy="dough-select"]').select("ince");

    cy.get('[data-cy="topping-0"]').check({ force: true });
    cy.get('[data-cy="topping-1"]').check({ force: true });
    cy.get('[data-cy="topping-2"]').check({ force: true });
    cy.get('[data-cy="topping-3"]').check({ force: true });

    cy.get('[data-cy="submit-order"]').should("not.be.disabled").click();

    cy.wait("@pizzaPost").its("request.body").should((body) => {
      expect(body.fullName).to.eq("Test Kullanıcı");
      expect(body.size).to.eq("Orta");
      expect(body.dough).to.eq("ince");
      expect(body.toppings).to.have.length(4);
    });

    cy.location("pathname").should("eq", "/onay");

    cy.get('[data-cy="success-title"]').should("be.visible");
    cy.get('[data-cy="success-summary"]').should("exist");
  });
});
