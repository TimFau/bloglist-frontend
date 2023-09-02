const username = 'TestUser'
const password = '1234567'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createAccount({ username, password, name: 'Guy' })
    cy.visit('')
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

    it('Fails with wrong credentials', function () {
      cy.get('#username').type(username)
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()
      cy.contains('Username or Password is incorrect')
    })
  })

  describe('When logged in', function () {
    const blogName = 'TestBlog'
    const blogAuthor = 'Test Man'
    const blogUrl = 'https://google.com'
    // Log in user
    beforeEach(function () {
      cy.login({ username, password })
    })

    it('A blog can be created', function  () {
      cy.get('#openCreateBlogButton').click()
      cy.get('#createBlogTitle').type(blogName)
      cy.get('#createBlogAuthor').type(blogAuthor)
      cy.get('#createBlogUrl').type(blogUrl)
      cy.get('#submitCreateBlogButton').click()
      cy.contains(`Blog "${blogName}" by ${blogAuthor} added`)
      cy.get('.blog-list-wrapper').contains(blogName)
      cy.get('.blog-list-wrapper').contains(blogAuthor)
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: blogName, author: blogAuthor, url: blogUrl })
      })
      it('A blog can be liked', function () {
        let likesBefore = undefined
        cy.get('.toggle-view-more-button').click()
        cy.get('.likes-count').then(function ($currentLikes) {
          likesBefore = parseInt($currentLikes.text())
        })
        cy.get('.increment-likes-button').click()
        cy.get('.likes-count').should(function ($currentLikes) {
          const likesAfter = parseInt($currentLikes.text())
          expect(likesAfter).to.equal(likesBefore + 1)
        })
      })

      it('A user can delete a blog they created', function () {
        cy.get('.users-blog .blog-info span').then(function ($blogTitle) {
          // Get text from '.blog-info > span' and assigne value to 'foundBlogTitle'
          const foundBlogTitle = $blogTitle.text()

          cy.get('.users-blog .toggle-view-more-button').click()
          cy.get('.users-blog .delete-button').click()
          cy.get('.blog-list-wrapper').contains(foundBlogTitle).should('not.exist')
        })
      })
      describe('When blogs from other users exist', function () {
        this.beforeEach(function () {
          const user2 = {
            username: 'TestUser2',
            password: 'testpsw',
            name: 'Test User2'
          }
          cy.createAccount({ username: user2.username, password: user2.password, name: user2.name })
          cy.login({ username: user2.username, password: user2.password })
          cy.createBlog({ title: 'Test Blog 2', author: 'Zachary', url: 'http://google.com/new' })
        })
        it('Delete button only appears for blogs created by the user', function () {
          cy.get('.blog-item').each(($el) => {
            cy.wrap($el).find('.toggle-view-more-button').click()
            if ($el.hasClass('users-blog')) {
              cy.wrap($el).find('.delete-button').should('exist')
            } else {
              cy.wrap($el).find('.delete-button').should('not.exist')
            }
          })
        })
      })
    })

  })
})