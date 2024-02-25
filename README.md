# Projeto de Testes Compra de um Produto automationtesting.in

### Este projeto utiliza a versão:
- Node.js v16.15.1
- Cypress v13.6.6
- Mochawesome Reporter<br />

### Rodando localmente
Clone o projeto para uma pasta da sua escolha<br />
<pre><code>https://github.com/felipe-era/CypressTest.git</code></pre>

Entre no diretório do projeto<br />
  <pre><code>cd seu_diretorio </code></pre>
 Para instalar as dependências<br />
 <pre><code>npm install</code></pre>
 
# Funcionalidade: Compra e Check Out de um produto
  Como um cliente<br />
  Eu quero comprar um produto<br />
  Para que eu possa concluir minha compra com sucesso

### CT01 - Compra de um produto com Pagamento Direct Bank
     Dado que eu adiciono um produto ao carrinho
     Quando eu preencho os dados do pedido
     E seleciono a opção de pagamento Direct Bank
     E eu finalizo o pedido
     Então eu valido os dados da compra

### CT02 - Compra de um produto com Pagamento Check Payments
      Dado que eu adiciono um produto ao carrinho
      Quando eu preencho os dados do pedido
      E seleciono a opção de pagamento Check Payments
      E eu finalizo o pedido
      Então eu valido os dados da compra

### CT03 - Compra de um produto com Pagamento Cash on Delivery
      Dado que eu adiciono um produto ao carrinho
      Quando eu preencho os dados do pedido
      E seleciono a opção de pagamento Cash on Delivery
      E eu finalizo o pedido
      Então eu valido os dados da compra

### CT04 - Compra de um produto com Pagamento Paypal
      Dado que eu adiciono um produto ao carrinho
      Quando eu preencho os dados do pedido
      E seleciono a opção de pagamento com Paypal
      E eu finalizo o pedido
      Então eu valido os dados da compra

### CT05 - Compra de um produto com validando quantidades e valores
      Dado que eu adiciono um produto ao carrinho de compras
      Quando eu acesso a tela do carrinho de compras
      E altero a quantidade do produto
      E atualizo o carrinho de compras
      E valido as atualizações de valores
      E eu finalizo o pedido
      Então eu valido os dados da compra
