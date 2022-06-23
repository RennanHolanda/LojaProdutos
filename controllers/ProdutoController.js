const fs = require('fs') // importa o módulo fs para a variável fs
const path = require('path') // importa o módulo path para a variável path
const { validationResult } = require('express-validator')

const produtosJson = path.join('produtos.json') // variavel que recebe o caminho do arquivo produtos.json 

let ProdutoController = {
   viewForm: (req, res) => {
      return res.render('produto');// redireciona o usuario para a view produto.ejs 
   },
   salvarForm: (req, res) => {
      const errors = validationResult(req);// recebe os erros do formulario
      if (!errors.isEmpty()) {// if que verifica se existe erros no formulario
         console.log(errors.mapped());// imprime os erros no console
         return res.render("produto", { errors: errors.mapped() }); // renderizar a view produto.ejs com o nome do produto e os erros
      }
      let { nomeProduto, precoProduto } = req.body; // define o nome e preco do produto para a variavel nomeProduto e precoProduto  e para assim criar um novo produto  e salvar no banco de dados  (req.body é um objeto que contem todos os dados do formulario)  e redireciona o usuario para a view sucesso.ejs confirmando o cadastro do produto

      let dadosJason = JSON.stringify([{ nome: nomeProduto, preco: precoProduto }]); // usa o stringify para transformar o objeto em string
      fs.writeFileSync(produtosJson, dadosJason); // salva no produtosJson os dados da variavel dadosJason
     
      res.redirect('/produtos/sucesso');// renderizar a view sucesso.ejs com o nome do produto

   },
   sucesso: (req, res) => {
      res.render('sucesso') //  renderizar a view sucesso.ejs com o nome do produto
   },
   viewAttForm: (req, res) => {
      let { id } = req.params; // define o id do produto para a variavel id  e para assim editar o produto no banco de dados  (req.params é um objeto que contem todos os dados do formulario)  e redireciona o usuario para a view produto.ejs para editar o produto
      let produtos = [
         { id: 1, nome: 'Notebook', preco: 10 }, // cria um array de produtos para teste  e para assim editar o produto no banco de dados  (req.params é um objeto que contem todos os dados do formulario)  e redireciona o usuario para a view produto.ejs para editar o produto
         { id: 2, nome: 'Mouse', preco: 20 },
      ]

      res.render('editarProduto', { produto: produtos[id] });// renderizar a view produto.ejs com o nome do produto
   },
   editar: (req, res) => {
      let { nomeProduto, precoProduto } = req.body // define o nome e preco do produto para a variavel nomeProduto e precoProduto  e para assim editar o produto no banco de dados  (req.body é um objeto que contem todos os dados do formulario)  e redireciona o usuario para a view sucesso.ejs confirmando o cadastro do produto
      res.send('Você editou o produto com sucesso' + nomeProduto)// envia a mensagem para o usuario
   },
   listarProdutos: (req, res) => {
      let produtos = fs.readFileSync(produtosJson, {encoding: 'utf-8'}); // le o arquivo produtosJson e converte para string e salva na variavel produtos
      produtos = JSON.parse(produtos); // vai pergar o conteudo de produtos atribuir nele mesmo e converte para objeto
      res.render('listaProdutos', { listaProdutos: produtos });// renderizar a view produto.ejs com o nome do produto
   },
   deletarProduto: (req, res) => {
      let { id } = req.params; // define o id do produto para a variavel id  e para assim deletar o produto no banco de dados  (req.params é um objeto que contem todos os dados do formulario)  e redireciona o usuario para a view sucesso.ejs confirmando o cadastro do produto
      res.send('Você deletou o produto com sucesso' + id)// envia a mensagem para o usuario

   }
}

module.exports = ProdutoController;// Importa o arquivo homeController.js do diretorio controllers para a variável homeController