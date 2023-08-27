const username = 'TestUser'
const password = '1234567'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username,
      password,
      name: 'Guy'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('Succeeds with correct credentials', function () {
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('#loginButton').click()
      cy.contains('Logged in')
    })

    it('Failes with wrong credentials', function () {
      cy.get('#username').type(username)
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()
      cy.contains('Username or Password is incorrect')
    })
  })
})