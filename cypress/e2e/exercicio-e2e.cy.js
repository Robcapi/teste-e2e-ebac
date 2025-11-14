/// <reference types="cypress" />
import produtoPage from '../support/page_objects/produto-page';
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

        //Fazendo um pedido de quatro produtos usando page objects
        let produto = 'Stellar Solar Jacket'
        let qtd = 4
        produtoPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
        produtoPage.addProdutoCarrinho('M', 'Yellow', qtd + 'x "Stellar Solar Jacket" foram adicionados ao seu carrinho')

        //Adicionando ao carrinho 
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button').click ()  
        cy.get('.checkout-button').click()   
        cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento') 

        //Preenchendo todas as opções no checkout
        cy.get('#billing_first_name').clear().type('Robson')
        cy.get('#billing_last_name').clear().type('Oliveira')
        cy.get('#billing_address_1').clear().type('Rua Teste 123')
        cy.contains('Estado')
        cy.contains('Minas Gerais')
        cy.get('#billing_phone').clear().type('35912345678')
        cy.get('#payment_method_cod').click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        //Validando minha compra
        cy.get('.woocommerce-order > :nth-child(3)').should('contain', 'Pagar em dinheiro na entrega.')
  });


})