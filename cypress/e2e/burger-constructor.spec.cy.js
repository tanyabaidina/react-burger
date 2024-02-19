describe('service is available', function() {
  it('should be available and open constructor by default', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
  });
});

describe('ingredient details popup should work', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept({
      method: 'GET',
      url: 'api/ingredients'
    }, {
      fixture: '../fixtures/ingredients.json'
    })
  });

  it('ingredient details popup open and close', () => {
    cy.get('#modal-root').should('be.empty');
    cy.get('[class^=ingredient-element_link__]').first().as('ingredient');

    cy.get('@ingredient').should('be.visible').click();

    cy.get('[class^=modal_wrapper__]').should('be.visible');
    cy.get('[class^=modal-overlay_background__]').should('be.visible').click({force: true});

    cy.get('#modal-root').should('be.empty');
  });

  it('ingredient details popup open and close by button', () => {
    cy.get('#modal-root').should('be.empty');
    cy.get('[class^=ingredient-element_link__]').first().as('ingredient');

    cy.get('@ingredient').should('be.visible').click();

    cy.get('[class^=modal_close__button]').should('be.visible').click();

    cy.get('#modal-root').should('be.empty')
  })

});

describe('drag and drop should work', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept({
      method: 'GET',
      url: 'api/ingredients'
    }, {
      fixture: '../fixtures/ingredients.json'
    })
  });

  it('drag and drop bun', () => {
    cy.get('#BUNS').as('buns');
    cy.get('[class^=burger-constructor_wrapper]').as('constructor');

    cy.get('@buns').should('be.visible');
    cy.get('@constructor').should('be.visible');

    cy.get('@buns')
        .children('[class^=burger-ingredients_list__]')
        .children('li')
        .children('[class^=ingredient-element_link__]').first().as('bun');

    cy.get('@bun')
        .should('be.visible')
        .trigger('dragstart');

    cy.get('@constructor').trigger('drop');

    cy.get('@bun')
        .children('[class^=ingredient-element_wrapper]')
        .children('.counter')
        .contains('2');

    cy.get('@bun')
        .children('[class^=ingredient-element_wrapper]')
        .children('p')
        .invoke('text')
        .then((text) => {
          cy.get('@constructor').contains(text)
        })
  });

  it('drag and drop ingredient', () => {
    cy.get('#MAINS').as('mains');
    cy.get('[class^=burger-constructor_wrapper]').as('constructor');

    cy.get('@constructor').should('be.visible');

    cy.get('@mains')
        .children('[class^=burger-ingredients_list__]')
        .children('li')
        .children('[class^=ingredient-element_link__]').first().as('main');

    cy.get('@main')
        .trigger('dragstart');

    cy.get('@constructor').trigger('drop');

    cy.get('@main')
        .children('[class^=ingredient-element_wrapper]')
        .children('.counter')
        .contains('1');

    cy.get('@main')
        .children('[class^=ingredient-element_wrapper]')
        .children('p')
        .invoke('text')
        .then((text) => {
          cy.get('@constructor').contains(text)
        })
  });
});

describe('creating an order should work', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept({
      method: 'GET',
      url: 'api/ingredients'
    }, {
      fixture: '../fixtures/ingredients.json'
    });
    cy.intercept({
      method: 'POST',
      url: 'api/auth/login'
    }, {
      fixture: '../fixtures/user.json'
    }).as('login');

    cy.intercept({
      method: 'GET',
      url: 'api/auth/user'
    }, {
      statusCode: 401,
      fixture: '../fixtures/no_auth_user.json'
    }).as('getUser');

    cy.intercept({
      method: 'POST',
      url: 'api/orders'
    }, {
      fixture: '../fixtures/order.json'
    }).as('order');
  });

  it('order details popup should not open', () => {
    cy.get('[class^=burger-constructor_wrapper]').as('constructor');

    cy.get('@constructor').contains("Выберете булку");
    cy.get('@constructor').contains("Выберете начинку");

    cy.get('[class^=burger-constructor_order]')
        .children('button').click();
    cy.get('#modal-root').should('be.empty');
  });

  it('creating an order user is not authorized', () => {
    cy.get('#BUNS').as('buns');
    cy.get('#MAINS').as('mains');
    cy.get('[class^=burger-constructor_wrapper]').as('constructor');
    cy.get('#modal-root').as('modal');

    cy.get('@constructor').should('be.visible');
    cy.get('@modal').should('be.empty');

    cy.get('@buns')
        .children('[class^=burger-ingredients_list__]')
        .children('li')
        .children('[class^=ingredient-element_link__]').first().as('bun');

    cy.get('@mains')
        .children('[class^=burger-ingredients_list__]')
        .children('li')
        .children('[class^=ingredient-element_link__]').first().as('main');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('@main').trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('[class^=burger-constructor_order]')
        .children('button')
        .as('order_button');

    cy.get('@order_button').click();

    cy.url().should('include', '/login');

    cy.get('input[type=email]').type('test_user@test.com');
    cy.get('input[type=password]').type('strongPassword');
    cy.get('button[type=submit]').click();

    cy.url().should('eq', 'http://localhost:3000/');

    cy.get('@bun')
        .children('[class^=ingredient-element_wrapper]')
        .children('p')
        .invoke('text')
        .then((text) => {
          cy.get('@constructor').contains(text)
        })

    cy.get('@main')
        .children('[class^=ingredient-element_wrapper]')
        .children('p')
        .invoke('text')
        .then((text) => {
          cy.get('@constructor').contains(text)
        })

    cy.get('@order_button').click();
    cy.get('@modal').should('not.be.empty');
    cy.get('@modal')
        .children('[class^=modal_wrapper]')
        .children('[class^=order-details_wrapper]')
        .should('contain', 'идентификатор заказа')
        .and('contain', '34422')
  })
})