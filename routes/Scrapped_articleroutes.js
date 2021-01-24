const express = require("express");
var router = express.Router();
var mangoscrapper = require("./News_Scrapping/News_Scrapper");
var dawnscrapper = require("./News_Scrapping/Searched_ArticlesScrapped");
var propakistaniscrapper = require("./News_Scrapping/propakistaniscrapped");

router.post("/mangobaaz", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  mangoscrapper().then((x) => {
    res.send(x);
  });
});

router.post("/dawn", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  dawnscrapper().then((x) => {
    res.send(x);
  });
});

router.post("/propakistani", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  propakistaniscrapper().then((x) => {
    res.send(x);
  });
});

module.exports = router;
