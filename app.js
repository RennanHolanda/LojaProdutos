var createError = require('http-errors'); // Importa o módulo http-errors para a variável createError (erro de requisição)  para ser usado no catch do try/catch
var express = require('express'); // Importa o módulo express para a variável express (express é um framework para criar aplicações web)
var path = require('path'); // Importa o módulo path para a variável path (path é um módulo para manipular caminhos de arquivos)
var cookieParser = require('cookie-parser'); // Importa o módulo cookie-parser para a variável cookieParser (cookie-parser é um módulo para manipular cookies)
var logger = require('morgan'); // Importa o módulo morgan para a variável logger (morgan é um módulo para logar requisições)
var app = express(); // Importa o módulo express para a variável app (app é um framework para criar aplicações web)
var homeRouter = require('./routes/homeRouter'); // Importa o módulo homeRouter para a variável homeRouter (homeRouter é um módulo para manipular rotas) (routes/homeRouter.js) 
var produtosRouter = require('./routes/produtosRouter');// Importa o módulo produtosRouter para a variável produtosRouter (produtosRouter é um módulo para manipular rotas) (routes/produtosRouter.js)
var methodOverride = require('method-override'); // Importa o módulo method-override para a variável methodOverride (method-override é um módulo para manipular requisições
var logMiddleware = require('./middlewares/logSite'); // Importa o módulo logMiddleware para a variável logMiddleware (logMiddleware é um módulo para manipular requisições)
// view engine setup
app.set('views', path.join(__dirname, 'views'));// define o diretorio de views (views) para o express (__dirname) e o arquivo index.ejs para o express (index.ejs) para renderizar a view 
app.set('view engine', 'ejs'); // define o motor de views para o express (ejs) para renderizar a view 

app.use(logger('dev'));// define o log do express para o morgan (dev) para logar as requisições 
app.use(express.json()); // define o express para receber requisições json
app.use(express.urlencoded({ extended: false }));// define o express para receber requisições urlencoded (extended: false) para não receber requisições urlencoded  com mais de um campo
app.use(cookieParser());// define o express para receber cookies (cookieParser) para manipular cookies 
app.use(express.static(path.join(__dirname, 'public')));// define o express para receber arquivos estáticos (public) para o express (__dirname) e o arquivo index.ejs para o express (index.ejs) para renderizar a view
app.use(methodOverride('_method'));// define o express para receber requisições method-override (_method) para manipular requisições com o método _method
app.use(logMiddleware);// define o express para receber requisições logMiddleware para manipular requisições


app.use('/', homeRouter); // define o express para receber as rotas (homeRouter) para o express (__dirname) e o arquivo index.ejs para o express (index.ejs) para renderizar a view 
app.use('/users', produtosRouter);// Importa o módulo produtosRouter para a variável produtosRouter (produtosRouter é um módulo para manipular rotas) (routes/produtosRouter.js) 
app.use('/produtos', produtosRouter)//  importar o módulo produtosRouter para a variável produtosRouter (produtosRouter é um módulo para manipular rotas) (routes/produtosRouter.js)

app.use((req, res) => { // define o express para receber as rotas (homeRouter) para o express (__dirname) e o arquivo index.ejs para o express (index.ejs) para renderizar a view
   return res.status(404).render('not-found'); // retorna o status 404 (not found) e renderiza a view 404 (404.ejs)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});// define o express para capturar erros (next) para o express (__dirname) e o arquivo index.ejs para o express (index.ejs) para renderizar a view

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
