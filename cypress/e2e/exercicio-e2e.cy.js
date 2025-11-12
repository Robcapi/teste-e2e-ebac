/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

      //Acessando a loja EBAC
    cy.login(perfil.usuario, perfil.senha , { log: false})
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, robson.teste (não é robson.teste? Sair)')

      //Fazendo um pedido de quatro produtos
    cy.get('.logo-in-theme > .logo > a > .logo-img').click()
    cy.get('.product-block >').first().click()
    cy.get('.button-variable-item-L').click() 
    cy.get('.button-variable-item-Orange').click()
    cy.get('.input-text').clear().type('4') 

    //Adicionando ao carrinho 
    cy.get('.single_add_to_cart_button').click()
    cy.get('.woocommerce-message > .button').click ()  
    cy.get('.checkout-button').click()   
    cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento') 

    //Preenchendo todas as opções no checkout
    cy.get('#billing_first_name').clear().type('Robson')
    cy.get('#billing_last_name').clear().type('Oliveira')
    cy.get('#billing_address_1').clear().type('Rua Teste 123')
    cy.get('#billing_state_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
    cy.get('.select2-search__field').type('Minas Gerais')
    cy.get('#billing_phone').clear().type('35912345678')
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()

    //Validando minha compra
    cy.get('.woocommerce-order > :nth-child(3)').should('contain', 'Pagar em dinheiro na entrega.')
  });


})