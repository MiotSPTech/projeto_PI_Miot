var express = require("express");
var router = express.Router();

var tomadaController = require("../controllers/tomadaController");

router.post("/buscarDadosGrafico", function (req, res) {
  tomadaController.buscarDadosGrafico(req, res);
})

router.post("/buscarUltimoRegistro", function (req, res) {
  tomadaController.buscarUltimoDadoRegistro(req, res);
})

module.exports = router;