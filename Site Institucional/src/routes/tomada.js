var express = require("express");
var router = express.Router();

var tomadaController = require("../controllers/tomadaController");

router.post("/buscarDadosGrafico", function (req, res) {
  tomadaController.buscarDadosGrafico(req, res);
})

router.post("/buscarUltimoRegistro", function (req, res) {
  tomadaController.buscarUltimoDadoRegistro(req, res);
})

router.post("/buscarTomadasProblema", function (req, res) {
  tomadaController.buscarTomadasProblema(req, res);
})

router.post("/buscarTomadasGrafico", function (req, res) {
  tomadaController.buscarTomadasGrafico(req, res);
})



module.exports = router;