import { faker } from '@faker-js/faker'

Cypress.Commands.add('gerarDadosAleatorios', () => {
    const dadosAleatorios = {
        primeiroNome: faker.person.firstName(),
        sobrenome: faker.person.lastName(),
        email: faker.internet.email(),
        cidade: faker.location.city(),
        telefone: faker.phone.number('#########'),
        rua: faker.location.street(),
        cep: faker.location.zipCode('########')
    };
    return dadosAleatorios;
});

Cypress.Commands.add('preencheDadosDoPedido', () => {
    cy.url().should('eq', 'https://practice.automationtesting.in/checkout/')
    cy.gerarDadosAleatorios().then((dadosAleatorios) => {
        cy.get('#billing_first_name').type(dadosAleatorios.primeiroNome)
        cy.get('#billing_last_name').type(dadosAleatorios.sobrenome)
        cy.get('#billing_email').type(dadosAleatorios.email)
        cy.get('#billing_phone').type(dadosAleatorios.telefone)
        cy.get('#billing_address_1').type(dadosAleatorios.rua)
        cy.get('#billing_postcode').type(dadosAleatorios.cep)
        cy.get('#billing_city').type(dadosAleatorios.cidade)
    });
    cy.get('#s2id_billing_country')
        .click()
    cy.get('.select2-drop ul li')
        .contains('Brazil')
        .click()
    cy.get('#s2id_billing_state')
        .click()
    cy.get('.select2-drop ul li')
        .contains('Paraná')
        .click()
});

Cypress.Commands.add('validarCarrinhoEProsseguir', () => {
    cy.url().should('eq', 'https://practice.automationtesting.in/basket/');
    cy.get('tr.cart_item').should('have.length.greaterThan', 0);
    cy.get('.checkout-button').should('be.visible').click();
});

Cypress.Commands.add('validarCarrinhoEProsseguirDetalhado', () => {
    cy.url().should('eq', 'https://practice.automationtesting.in/basket/');
    cy.get('tr.cart_item').should('have.length.greaterThan', 0);

    let totalAntes;
    cy.get('strong > .woocommerce-Price-amount')
        .invoke('text')
        .then((text) => {
            totalAntes = text;
        });

    cy.get('.quantity > .input-text')
        .clear()
        .type('3');
    cy.get('[name="update_cart"]')
        .click();

    // Verifique se o valor total foi atualizado
    cy.get('strong > .woocommerce-Price-amount')
        .invoke('text')
        .should((totalDepois) => {
            expect(totalDepois).not.to.eq(totalAntes);
        });

    cy.get('.checkout-button')
        .should('be.visible')
        .click();
});

Cypress.Commands.add('preencheDadosDoPedido', () => {
    cy.url().should('eq', 'https://practice.automationtesting.in/checkout/')
    cy.gerarDadosAleatorios().then((dadosAleatorios) => {
        cy.get('#billing_first_name').type(dadosAleatorios.primeiroNome)
        cy.get('#billing_last_name').type(dadosAleatorios.sobrenome)
        cy.get('#billing_email').type(dadosAleatorios.email)
        cy.get('#billing_phone').type(dadosAleatorios.telefone)
        cy.get('#billing_address_1').type(dadosAleatorios.rua)
        cy.get('#billing_postcode').type(dadosAleatorios.cep)
        cy.get('#billing_city').type(dadosAleatorios.cidade)
    });
    cy.get('#s2id_billing_country')
        .click()
    cy.get('.select2-drop ul li')
        .contains('Brazil')
        .click()
    cy.get('#s2id_billing_state')
        .click()
    cy.get('.select2-drop ul li')
        .contains('Paraná')
        .click()
});


Cypress.Commands.add('validarFormaPagamento', (idPagamento) => {
    switch (idPagamento) {
        case 1:
            cy.get('#payment_method_bacs').check();
            cy.get('#payment_method_bacs').should('be.checked');
            cy.get('.wc_payment_method.payment_method_bacs').should('be.visible');
            cy.get('.wc_payment_method.payment_method_bacs > .payment_box > p').should('be.visible');
            cy.get('#place_order').click()
            break;
        case 2:
            cy.get('#payment_method_cheque').check();
            cy.get('#payment_method_cheque').should('be.checked');
            cy.get('.wc_payment_method.payment_method_cheque').should('be.visible');
            cy.get('.wc_payment_method.payment_method_cheque > .payment_box > p').should('be.visible');
            cy.get('#place_order').click()
            break;
        case 3:
            cy.get('#payment_method_cod').check();
            cy.get('#payment_method_cod').should('be.checked');
            cy.get('.wc_payment_method.payment_method_cod').should('be.visible');
            cy.get('.wc_payment_method.payment_method_cod > .payment_box > p').should('be.visible');
            cy.get('#place_order').click()
            break;
        case 4:
            cy.get('#payment_method_ppec_paypal').check();
            cy.get('#payment_method_ppec_paypal').should('be.checked');
            cy.get('.wc_payment_method.payment_method_ppec_paypal > .payment_box > p').should('be.visible');
            cy.get('#place_order').click()
            cy.get('.woocommerce-error').should('be.visible');
            //Integração PayPal não finalizada
            break;
        default:
            cy.log('ID de pagamento inválido');
    }
});

Cypress.Commands.add('validarDadosPedido', (idPagamento) => {
    switch (idPagamento) {
        case 1:
            cy.url().should('include', 'order-received')
            cy.get('.woocommerce-thankyou-order-received')
                .should('contain', 'Thank you. Your order has been received.')
            cy.get('.order > strong')
                .invoke('text')
                .should('not.be.empty')
            cy.get('.method > strong')
                .invoke('text')
                .should('match', /Direct Bank Transfer/);
            cy.get(':nth-child(3) > td')
                .invoke('text')
                .should('match', /Direct Bank Transfer/);
            break;
        case 2:
            cy.url().should('include', 'order-received')
            cy.get('.woocommerce-thankyou-order-received')
                .should('contain', 'Thank you. Your order has been received.')
            cy.get('.order > strong')
                .invoke('text')
                .should('not.be.empty')
            cy.get('.method > strong')
                .invoke('text')
                .should('match', /Check Payments/);
            cy.get(':nth-child(3) > td')
                .invoke('text')
                .should('match', /Check Payments/);
            break;
        case 3:
            cy.url()
                .should('include', 'order-received')
            cy.get('.woocommerce-thankyou-order-received')
                .should('contain', 'Thank you. Your order has been received.')
            cy.get('.order > strong')
                .invoke('text')
                .should('not.be.empty')
            cy.get('.method > strong')
                .invoke('text')
                .should('match', /Cash on Delivery/);
            cy.get(':nth-child(3) > td')
                .invoke('text')
                .should('match', /Cash on Delivery/);
            break;
        case 4:
          

            break;
        default:
            cy.log('ID de pagamento inválido');
    }
});

