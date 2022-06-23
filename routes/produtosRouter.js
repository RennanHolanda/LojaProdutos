let express = require('express'); // Importa o módulo express para a variável express (express é um framework para criar aplicações web)
let router = express.Router(); // importa o router do express para o nosso arquivo homeController.js do diretorio controllers
let ProdutoController = require('../controllers/ProdutoController') //  importar o arquivo homeController.js do diretorio controllers (homeController.js) para a variável homeController
let multer = require('multer') // Importa o módulo multer para a variável multer
let path = require('path') // trás o caminho extato do arquivo
const logDBMiddleware = require('../middlewares/logDB'); // importa o middleware logDBMiddleware para a variável logDBMiddleware
const { body }=require('express-validator'); // importa o body do express-validator para a variável body

const validacoes = [
    body('nome').notEmpty().isString(),
    body('email').isString().notEmpty()
]




const multiDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => { // função que define onde será salvo o arquivo  (diretorio)
        const folder = path.join(__dirname, '../public/profile');// trás o caminho absoluto do diretorio, garante que sempre estaremos no diretorio raiz do projeto
        callback(null, folder);// folder é o caminho absoluto do diretorio onde será salvo o arquivo
    },
    filename: (req, file, callback) => {
        const imageName = Date.now() + file.originalname;// date.now() gera um nome único para o arquivo com a data atual, file.originalname é o nome do arquivo original
        callback(null, imageName);// null é o erro, imageName é o nome do arquivo
    }
});

const upload = multer({ storage: multiDiskStorage });// multer é um módulo que permite fazer upload de arquivos, storage é um objeto que define onde será salvo o arquivo




/* GET users listing. */
router.get('/criar', ProdutoController.viewForm); //direciona o usuario para o metodo  viewForm do controller ProdutoController (homeController.js) para a view do formulario.ejs  (criar produto) e para assim criar um novo produto 
router.post('/criar', validacoes,upload.single('avatar'),logDBMiddleware, ProdutoController.salvarForm); //direciona o usuario para o metodo  salvarForm do controller ProdutoController (homeController.js) para salvar o produto no banco de dados, passa pelo middleware logDBMiddleware para salvar o log no banco de dados
router.get('/sucesso', ProdutoController.sucesso); //  direciona o usuario para o metodo  sucesso do controller ProdutoController (homeController.js) para a view de sucesso.ejs confirmando o cadastro do produto
router.get('/:id/editar', ProdutoController.viewAttForm); // direciona o usuario para o metodo  viewFormEditar do controller ProdutoController (homeController.js) rota para dar acesso a  view do formulario de edição  (editar produto) e para assim editar o produto no banco de dados
router.put('/editar', ProdutoController.editar); // direciona o usuario para o metodo  editar do controller ProdutoController (homeController.js) para editar o produto no banco de dados
router.get('/', ProdutoController.listarProdutos); // direciona o usuario para o metodo  listarProdutos do controller ProdutoController (homeController.js) para a view de listar produtos
router.delete('/deletar/:id', ProdutoController.deletarProduto); // direciona o usuario para o metodo  deletar do controller ProdutoController (homeController.js) para deletar o produto no banco de dados





module.exports = router;