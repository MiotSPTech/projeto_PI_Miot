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

  var instrucaoSql = `SELECT  s.ramalSetor,  s.andar,  s.nomeSetor,
  (SELECT COUNT(*)  FROM tbTomada t 
    WHERE t.idSetor = s.idSetor) AS qtdTotalTomadas,
    (SELECT COUNT(*)  FROM tbTomada t 
     WHERE t.idSetor = s.idSetor AND t.statusTomada = 'desligada') AS qtdTomadasDesligadas,
    (SELECT COUNT(*) FROM tbRegistro r
     JOIN tbTomada t ON t.idTomada = r.idTomada
     WHERE t.idSetor = s.idSetor  AND r.idRegistro = ( SELECT MAX(r2.idRegistro)  FROM tbRegistro r2 
     WHERE r2.idTomada = t.idTomada ) AND r.statusRegistro IN ('Em Alerta', 'Critico')) AS qtdRegistrosEmAlertaOuCritico
FROM tbSetor s
WHERE s.idSetor = ${id};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarSetoresGrafico(id) {

  var instrucaoSql = `SELECT s.idSetor, s.nomeSetor, COUNT(*) AS qtdRegistrosEmAlertaOuCritico
FROM tbRegistro r
JOIN tbTomada t ON r.idTomada = t.idTomada
JOIN tbSetor s ON t.idSetor = s.idSetor
join tbIndustria  i on i.codigoIndustria = s.codigoIndustria
WHERE r.statusRegistro IN ('Critico', 'Em Alerta') AND r.dataHoraRegistro >= NOW() - INTERVAL 30 DAY and i.codigoIndustria = '${id}'
GROUP BY s.idSetor;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarSetoresProblema(id) {

  var instrucaoSql = `SELECT s.idSetor, s.nomeSetor, COUNT(*) AS qtdRegistrosEmAlertaOuCritico
FROM tbRegistro r
JOIN tbTomada t ON r.idTomada = t.idTomada
JOIN tbSetor s ON t.idSetor = s.idSetor
join tbIndustria  i on i.codigoIndustria = s.codigoIndustria
WHERE r.statusRegistro IN ('Critico', 'Em Alerta') AND r.dataHoraRegistro >= NOW() - INTERVAL 30 DAY and i.codigoIndustria = '${id}'
GROUP BY s.idSetor
ORDER BY qtdRegistrosEmAlertaOuCritico DESC LIMIT 1;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function cadastrar(empresaId, descricao) 
  
//   var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }


module.exports = {
  buscarSetores,
  buscarTomadasporSetor,
  buscarInformacaoSetor,
  buscarSetoresGrafico,
  buscarSetoresProblema
//   ,
//   cadastrar
}
