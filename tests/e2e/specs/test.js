// https://docs.cypress.io/api/introduction/api.html
/// <reference types="Cypress" />

describe('E2E BentoStarter testing using Cypress', () => {
  it('Home page', () => {
    cy.visit('/home')
    cy.contains('.home-page-title', 'Bento starter')
  })

  it('Login with Google', () => {
    cy.visit('/login')
    cy.contains('.login-page-title', 'Login page')
  })
})
