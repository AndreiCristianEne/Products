describe('Product App tests', () => {
    it('successfully loads', function() {
        cy.visit('/')
    })

    it('does an api request successfully', function() {
        // seed a post in the DB that we control from our tests
        cy.request('GET', 'http://localhost:4000/api/products');
    })

    it('title contains the right text', function() {
        cy.get('.header-title').contains('Products app');
    })

    it('successfully does a search request to filter the products', function() {
        cy.get('input')
        .type('apple')
    })

    it('should containt funcoality for adding a product, changing the url', function() {
        cy.get('.button-div')
        .click()

        cy.url()
        .should('include', '/add-product')
    })
})

