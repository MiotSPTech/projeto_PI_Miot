var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.get("/buscarInformacaoSetor", function (req, res) {
  setorController.buscarInformacaoSetor(req, res);
});

router.post("/buscarTomadasporSetor", function (req, res) {
  setorController.buscarTomadasporSetor(req, res);
})

module.exports = router;