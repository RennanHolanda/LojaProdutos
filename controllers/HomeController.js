let HomeController = {
   viewContato: (req, res) => {// rota raiz do site (/) e chama o método viewHome do arquivo homeController.js
      let { nome, idade } = req.query;// define o nome e idade do usuario para a variavel nome e idade
      res.render('contato', { nomeUsuario: nome });// define o express para renderizar a view contato.ejs com o nome do usuario
   },
   confirmarcontato: (req, res) => {
      let { nome, email } = req.query; // define o nome e email do usuario para a variavel nome e email. e para assim criar um novo usuario e salvar no banco de dados. req.query é um objeto que contem todos os dados do formulario
      res.send('recebido com sucesso as informações do: ' + nome)//  envia a mensagem para o usuario
   }

}



module.exports = HomeController; // Importa o arquivo homeController.js do diretorio controllers para a variável homeController