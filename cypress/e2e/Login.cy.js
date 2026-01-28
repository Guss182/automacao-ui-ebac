///<reference types="cypress"/>

describe('Login', () => {

  beforeEach(() => {
    cy.visit('login.html')
  });

  it('Deve realizar login com sucesso', () => {
    cy.get('#email').type('usuario@teste.com')
    cy.get('#password').type('user123')
    cy.get('#login-btn').click()
  });

  it('Deve exibir mensagem de erro ao inserir email inválido', () => {
    cy.get('#email').type('teste0@teste.com')
    cy.get('#password').type('123456@ssenha')
    cy.get('#login-btn').click()
    cy.get('#alert-container').should('exist')
  });

  it('Deve exibir mensagem de erro ao inserir senha inválida', () => {
    cy.get('#email').type('usuario@teste.com')
    cy.get('#password').type('senha123')
    cy.get('#login-btn').click()
    cy.get('#alert-container').should('exist')
  });

  it('Deve exibir mensagem de erro ao deixar os campos vazios', () => {
    cy.get('#login-btn').click()
    cy.get(':nth-child(1) > .invalid-feedback').should('exist')

  });

  it('Deve exibir mensagem de erro ao informar email válido e deixar senha vazia', () => {
    cy.get('#email').type('usuario@teste.com')
    cy.get('#login-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve exibir mensagem de erro ao informar senha válida e deixar email vazio', () => {
    cy.get('#password').type('user123')
    cy.get('#login-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve permanecer na página de login após falha no login', () => {
    cy.get('#email').type('teste0@teste.com')
    cy.get('#password').type('senhaerrada')
    cy.get('#login-btn').click()
    cy.url().should('include', 'login.html')
  })
});