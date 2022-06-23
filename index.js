const fs = require('fs')
const path = require('path')


let caminhoArquivo = path.join('prova.txt')


let conteudo = fs.readFileSync(caminhoArquivo, {encoding: 'utf-8'})

console.log(conteudo)