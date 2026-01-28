///<reference types="cypress"/>

describe('Funcionalidade: Produtos', () => {

  beforeEach(() => {
    cy.visit('catalog.html')
  })

  it('Deve exibir o título da página', () => {
    cy.contains('Conheça Nosso Acervo').should('be.visible')
  })

  it('Deve exibir os produtos na tela', () => {
    cy.get('.card').should('have.length.greaterThan', 0)
  })

  it('Não deve exibir itens no carrinho ao carregar a página', () => {
    cy.get('#cart-count').should('contain', '0')
  })

  it('Não deve adicionar produto ao carrinho ao apenas clicar no nome do livro', () => {
    cy.contains('Dom Casmurro').click()
    cy.get('#cart-count').should('contain', '0')
  })

  it('Deve adicionar um único produto ao carrinho', () => {
    cy.get('.btn-primary').first().click()
    cy.get('#cart-count').should('contain', '1')
  })

  it('Deve permitir multiplos produtos ao carrinho', () => {
  cy.get('.btn-primary').eq(0).click()
  cy.get('.btn-primary').eq(1).click()
  cy.get('.btn-primary').eq(2).click()
  cy.get('#cart-count').should('contain', '3')
})

  it('Deve exibir alerta ao adicionar produto específico', () => {
    cy.get('.btn-primary').eq(4).click()
    cy.get('#global-alert-container').should('be.visible').and('contain', 'A Metamorfose')
  })

  it('Não deve quebrar a página ao realizar uma busca inexistente', () => {
    cy.get('input').first().type('livroinexistente123')
    cy.contains('Conheça Nosso Acervo').should('be.visible')
  })

  it('Deve navegar para a página de detalhes do livro', () => {
    cy.contains('Dom Casmurro').click()
    cy.url().should('include', 'book-details')
  })

  it('Deve navegar para a próxima página do catálogo', () => {
    cy.contains('Próximo').click()
    cy.contains('Anterior').should('be.visible')
  })
})
