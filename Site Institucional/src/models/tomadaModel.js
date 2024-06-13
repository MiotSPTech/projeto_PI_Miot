var database = require("../database/config");

function buscarDadosGrafico(id) {

  var instrucaoSql = `SELECT leituraUmidade, leituraTemperatura, DATE_FORMAT(dataHoraRegistro, '%Hh%i') AS horaRegistro FROM tbRegistro 
                        WHERE tbRegistro.idTomada = ${id}
                        ORDER BY idRegistro DESC LIMIT 7;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarUltimoDadoRegistro(id) {

  var instrucaoSql = `SELECT leituraUmidade, leituraTemperatura, statusRegistro, DATE_FORMAT(dataHoraRegistro, '%Hh%i') AS horaRegistro, aparelhoConectadoTomada, statusTomada, descricaoTomada
 FROM tbTomada
 inner join tbRegistro on tbRegistro.idTomada = tbTomada.idTomada
                        WHERE tbRegistro.idTomada = ${id}
                        ORDER BY idRegistro DESC LIMIT 1;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


// function cadastrar(empresaId, descricao) {
  
//   var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }


module.exports = {
  buscarDadosGrafico,
  buscarUltimoDadoRegistro
//   ,
//   cadastrar
}
