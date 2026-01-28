///<reference types="cypress"/>
import { faker } from '@faker-js/faker'

describe('Pré-cadastro', () => {

  beforeEach(() => {
    cy.visit('register.html')
  })

  it('Deve realizar o cadastro com dados válidos', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const senha = faker.internet.password(8)

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#confirm-password').type(senha)
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve exibir mensagem de erro ao tentar fazer cadastro sem preencher os campos', () => {
    cy.get('#register-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve exibir uma mensagem de erro ao informar email inválido', () => {
    const nome = faker.person.fullName()

    cy.get('#name').type(nome)
    cy.get('#email').type('emailinvalido')
    cy.get('#password').type('123456@senha')
    cy.get('#confirm-password').type('123456@senha')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve exibir uma mensagem de erro ao tentar cadastrar com email já registrado', () => {
    const nome = faker.person.fullName()
    const senha = faker.internet.password(8)
    cy.get('#name').type(nome)
    cy.get('#email').type('usuario@teste.com')
    cy.get('#password').type(senha)
    cy.get('#confirm-password').type(senha)
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.get('#alert-container').should('exist')
  })

  it('Deve exibir mensagem informando a força da senha', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email()

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type('123')
    cy.get('#password-strength').should('exist')
    cy.get('#password-feedback').should('exist')
  })

  it('Deve exibir mensagem de erro ao inserir senha fraca', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email()

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type('123')
    cy.get('#confirm-password').type('123')
    cy.get('#terms-agreement').check()
    cy.get('#register-btn').click()
    cy.get('#password-strength').should('exist')
    cy.get('#password-feedback').should('exist')

  })

  it('Deve informar erro quando as senhas não coincidem', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const senha = faker.internet.password(8)
    const senhaDiferente = faker.internet.password(8)

    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#confirm-password').type(senhaDiferente)
    cy.get(':nth-child(5) > .invalid-feedback').should('exist')
  })

  it('Deve exibir mensagem de erro ao não aceitar os termos de uso', () => {
    const nome = faker.person.fullName()
    const email = faker.internet.email()
    const senha = faker.internet.password(8)
    cy.get('#name').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#confirm-password').type(senha)
    cy.get('#register-btn').click()
    cy.get('.form-check').should('exist')
  })
});
