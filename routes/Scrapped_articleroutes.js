const express = require("express");
var router = express.Router();
var mangoscrapper = require("./News_Scrapping/News_Scrapper");
var dawnscrapper = require("./News_Scrapping/Searched_ArticlesScrapped");
var propakistaniscrapper = require("./News_Scrapping/propakistaniscrapped");

router.get("/mangobaaz", (req, res) => {
  mangoscrapper().then((x) => {
    res.send(x);
  });
});

router.get("/dawn", (req, res) => {
  dawnscrapper().then((x) => {
    res.send(x);
  });
});

router.get("/propakistani", (req, res) => {
  propakistaniscrapper().then((x) => {
    res.send(x);
  });
});

module.exports = router;
