var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.post("/buscarInformacaoSetor", function (req, res) {
  setorController.buscarInformacaoSetor(req, res);
});

router.post("/buscarTomadasporSetor", function (req, res) {
  setorController.buscarTomadasporSetor(req, res);
})

router.post("/buscarSetoresGrafico", function (req, res) {
  setorController.buscarSetoresGrafico(req, res);
})

router.post("/buscarSetoresProblema", function (req, res) {
  setorController.buscarSetoresProblema(req, res);
})

module.exports = router;