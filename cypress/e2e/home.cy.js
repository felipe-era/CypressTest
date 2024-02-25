const idsPagamento = [
  { id: 1, nome: 'Direct Bank' },
  { id: 2, nome: 'Check Payments' },
  { id: 3, nome: 'Cash on Delivery' },
  { id: 4, nome: 'Paypal' }
];
const idsProduto = [169, 170, 181, 182, 180, 165, 160, 163];
const idProdutoAleatorio = idsProduto[Math.floor(Math.random() * idsProduto.length)];
const seletorProduto = `[data-product_id="${idProdutoAleatorio}"]`;

describe('Acessa a página de Compras', () => {
  beforeEach(() => {
    cy.visit('https://practice.automationtesting.in/shop')
    cy.get('#site-logo').should('be.visible')
  });

  context('Teste de Compra e Check Out', function () {
    it('CT01 - Realiza a compra de um produto com Pagamento Direct Bank', function () {
      cy.get(seletorProduto)
        .click();
      cy.get('.added_to_cart.wc-forward')
        .should('be.visible')
        .click()
      cy.validarCarrinhoEProsseguir()
      cy.preencheDadosDoPedido()
      cy.validarFormaPagamento(idsPagamento[0].id);
      cy.validarDadosPedido(idsPagamento[0].id)
    })

    it('CT02 - Realiza a compra de um produto com Pagamento Check Payments', function () {
      cy.get(seletorProduto)
        .click();
      cy.get('.added_to_cart.wc-forward')
        .should('be.visible')
        .click()
      cy.validarCarrinhoEProsseguir()
      cy.preencheDadosDoPedido()
      cy.validarFormaPagamento(idsPagamento[1].id);
      cy.validarDadosPedido(idsPagamento[1].id)
    })

    it('CT03 - Realiza a compra de um produto com Pagamento Cash on Delivery', function () {
      cy.get(seletorProduto)
        .click();
      cy.get('.added_to_cart.wc-forward')
        .should('be.visible')
        .click()
      cy.validarCarrinhoEProsseguir()
      cy.preencheDadosDoPedido()
      cy.validarFormaPagamento(idsPagamento[2].id);
      cy.validarDadosPedido(idsPagamento[2].id)
    })

    it('CT04 - Realiza a compra de um produto com Pagamento Paypal', function () {
      cy.get(seletorProduto)
        .click();
      cy.get('.added_to_cart.wc-forward')
        .should('be.visible')
        .click()
      cy.validarCarrinhoEProsseguir()
      cy.preencheDadosDoPedido()
      cy.validarFormaPagamento(idsPagamento[3].id);
      cy.validarDadosPedido(idsPagamento[3].id)
    })

    it('CT05 - Realiza a compra de um produto com validando quantidades e valores', function () {
      cy.get(seletorProduto)
        .click();
      cy.get('.added_to_cart.wc-forward')
        .should('be.visible')
        .click()
      cy.validarCarrinhoEProsseguirDetalhado()
      cy.preencheDadosDoPedido()
      cy.validarFormaPagamento(idsPagamento[0].id);
      cy.validarDadosPedido(idsPagamento[0].id)
    })

  })
})
