var express = require('express'); // Importa o módulo express para a variável express
var router = express.Router(); // importa o router do express para o nosso arquivo
var homeRouter = require('../controllers/HomeController'); // importar o arquivo homeController.js do diretorio controllers
var multer = require('multer'); // Importa o módulo multer para a variável multer
const path = require('path'); // trás o caminho extato do arquivo
const { callbackify } = require('util');

/* GET home page. */

// const multiDiskStorage = multer.diskStorage({
//     destination: (req, file, callback) => { // função que define onde será salvo o arquivo  (diretorio)
//       const folder = puth.join(__dirname, '../public/profile');// trás o caminho absoluto do diretorio, garante que sempre estaremos no diretorio raiz do projeto
//       callbackify(null, folder);// folder é o caminho absoluto do diretorio onde será salvo o arquivo
//     },
//     filename: (req, file, callback) => {
//       const imageName = Date.now() + file.originalname;// date.now() gera um nome único para o arquivo com a data atual, file.originalname é o nome do arquivo original
//       callbackify(null, imageName);// null é o erro, imageName é o nome do arquivo
//     }
//   });

// const upload = multer({ storage: multiDiskStorage });// multer é um módulo que permite fazer upload de arquivos
router.get('/', function (req, res, next) { // rota raiz do site (/) e chama o método viewHome do arquivo homeController.js
  res.render('index', { title: 'Express' });
});

router.get('/contato', homeRouter.viewContato); //direciona o usuario para o metodo  viewContato do controller HomeController
router.get('/confirmarcontato', homeRouter.confirmarcontato); // direciona o usuario para o metodo confirmarcontato do controller HomeController


module.exports = router; // exporta o router para o arquivo principal index.js do diretorio routes (routes/index.js) para ser usado no app.js 
