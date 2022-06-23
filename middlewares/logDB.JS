const fs = require('fs'); 

function logDB(req, res, next) {// função que vai logar no banco de dados
    fs.appendFileSync('logDB.txt', "Foi criado um registro pela url:" + req.url)// escreve no arquivo logDB.txt
    next();
}
module.exports = logDB;