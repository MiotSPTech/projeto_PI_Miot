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


function buscarTomadasGrafico(id) {
  var instrucaoSql = `
      SELECT t.descricaoTomada, COUNT(*) AS qtdProblemas
      FROM tbRegistro r
      JOIN tbTomada t ON r.idTomada = t.idTomada
      JOIN tbSetor s ON t.idSetor = s.idSetor
      JOIN tbIndustria i ON s.codigoIndustria = i.codigoIndustria
      WHERE r.statusRegistro IN ('Critico', 'Em Alerta') 
      AND r.dataHoraRegistro >= NOW() - INTERVAL 30 DAY 
      AND i.codigoIndustria = '${id}'
      GROUP BY t.idTomada, t.descricaoTomada
      ORDER BY qtdProblemas DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarTomadasProblema(id) {

  var instrucaoSql = `SELECT t.idTomada, t.descricaoTomada, COUNT(*) AS qtdProblemas
FROM tbRegistro r
JOIN tbTomada t ON r.idTomada = t.idTomada
JOIN tbSetor s ON t.idSetor = s.idSetor
JOIN tbIndustria i ON s.codigoIndustria = i.codigoIndustria
WHERE r.statusRegistro IN ('Critico', 'Em Alerta') AND r.dataHoraRegistro >= NOW() - INTERVAL 30 DAY AND i.codigoIndustria = '${id}'
GROUP BY t.idTomada
ORDER BY qtdProblemas DESC LIMIT 1;`;

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
  buscarUltimoDadoRegistro,
  buscarTomadasGrafico,
  buscarTomadasProblema
//   ,
//   cadastrar
}
