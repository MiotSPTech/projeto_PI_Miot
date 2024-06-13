var database = require("../database/config");

function buscarSetores(id) {

  var instrucaoSql = `select distinct tbSetor.idSetor, tbSetor.nomeSetor, tbRegistro.statusRegistro from tbIndustria
                      inner join tbSetor on tbSetor.codigoIndustria = tbIndustria.codigoIndustria
                      inner join tbTomada on tbTomada.idSetor = tbSetor.idSetor
                      inner join tbRegistro on tbRegistro.idTomada = tbTomada.idTomada
                      where tbRegistro.statusRegistro IN ('Em Alerta', 'Critico') and tbIndustria.codigoIndustria = '${id}'
                      order by tbRegistro.statusRegistro DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTomadasporSetor(id) {

  var instrucaoSql = `SELECT t.idTomada, t.descricaoTomada, t.aparelhoConectadoTomada, r.statusRegistro FROM tbTomada t
                      INNER JOIN (SELECT r1.idTomada, r1.statusRegistro FROM tbRegistro r1 WHERE r1.idRegistro = (SELECT MAX(r2.idRegistro) FROM tbRegistro r2 WHERE r2.idTomada = r1.idTomada)) r  
                      ON t.idTomada = r.idTomada
                      WHERE t.idSetor = ${id} AND r.statusRegistro IN ('Em Alerta', 'Critico');`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarInformacaoSetor(id) {

  var instrucaoSql = `select ramalSetor, andar from tbSetor 
                      where idSetor = 2;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function cadastrar(empresaId, descricao) {
  
//   var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }


module.exports = {
  buscarSetores,
  buscarTomadasporSetor,
  buscarInformacaoSetor
//   ,
//   cadastrar
}
