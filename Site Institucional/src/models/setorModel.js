var database = require("../database/config");

function buscarSetores(empresaId) {

  var instrucaoSql = `SELECT idSetor,nomeStor  FROM aquario a WHERE fk_empresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function cadastrar(empresaId, descricao) {
  
//   var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }


module.exports = {
  buscarSetores
//   ,
//   cadastrar
}
