describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'nimi',
      username: 'kayttaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('Blog app ', function() {
    it('front page can be opened', function() {
      cy.contains('Blogisovellus')
    })

    it('login form can be opened', function() {
      cy.contains('log in')
        .click()
    })

    it('user can login', function() {
      cy.contains('log in')
        .click()
      cy.get('#username')
        .type('kayttaja')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('nimi logged in')
    })

    it("user can't login with invalid username", function() {
      cy.contains('log in')
        .click()
      cy.get('#username')
        .type('kayttaja')
      cy.get('#password')
        .type('sala')
      cy.contains('login')
        .click()
      cy.contains('nimi logged in').should('not.exist')
    })

    it('user can logout' , function() {
      cy.contains('log in')
        .click()
      cy.get('#username')
        .type('kayttaja')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('nimi logged in')
      cy.get('#logout')
        .click()
      cy.contains('log in')
    })

  })

  describe('logged in', function() {
    beforeEach(function() {
      cy.contains('log in')
        .click()
      cy.get('#username')
        .type('kayttaja')
      cy.get('#password')
        .type('salainen')
      cy.contains('login')
        .click()
      cy.contains('nimi logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a new blog again')
      cy.get('#author')
        .type('a new author again')
      cy.get('#url')
        .type('a new url again')
      cy.get('#create')
        .click()
      cy.contains('a new blog again a new author again')
    })

    it ('user can cancel creating a blog', function() {
      cy.contains('new blog')
        .click()
      cy.contains('cancel')
        .click()
      cy.contains('new blog')
    })

    it("an invalid blog can't be created", function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a bad example')
      cy.get('#create')
        .click()
      cy.contains('a bad example').should('not.exist')
    })
  })
})
