var setorModel = require("../models/setorModel");

function buscarSetores(req, res) {
  var idIndustria = req.params.idIndustria;

  setorModel.buscarSetores(idIndustria).then((resultado) => {
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


function buscarTomadasporSetor(req, res) {
    var idSetor = req.body.idSetor;
  
    setorModel.buscarTomadasporSetor(idSetor).then((resultado) => {
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
 
  
  function buscarInformacaoSetor(req, res) {
    var idSetor = req.body.idSetor;
  
    setorModel.buscarInformacaoSetor(idSetor).then((resultado) => {
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
  
  function buscarSetoresGrafico(req, res) {
    var codigoIndustria = req.body.codigoIndustria;
  
    setorModel.buscarSetoresGrafico(codigoIndustria).then((resultado) => {
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

  function buscarSetoresProblema(req, res) {
    var codigoIndustria = req.body.codigoIndustria;
  
    setorModel.buscarSetoresProblema(codigoIndustria).then((resultado) => {
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
  buscarSetores,
  buscarTomadasporSetor,
  buscarInformacaoSetor,
  buscarSetoresGrafico,
  buscarSetoresProblema
}