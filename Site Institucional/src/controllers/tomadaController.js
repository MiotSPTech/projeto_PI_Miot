var tomadaModel = require("../models/tomadaModel");

function buscarDadosGrafico(req, res) {
  var idTomada = req.body.idTomada;
  console.log(idTomada)

  tomadaModel.buscarDadosGrafico(idTomada).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function buscarUltimoDadoRegistro(req, res) {
    var idTomada = req.body.idTomada;
  
    tomadaModel.buscarUltimoDadoRegistro(idTomada).then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }
 


module.exports = {
  buscarDadosGrafico,
  buscarUltimoDadoRegistro
}