const express = require("express");
var router = express.Router();
var mangoscrapper = require("./News_Scrapping/News_Scrapper");
var dawnscrapper = require("./News_Scrapping/Searched_ArticlesScrapped");
var propakistaniscrapper = require("./News_Scrapping/propakistaniscrapped");

router.post("/mangobaaz", (req, res) => {
  mangoscrapper().then((x) => {
    res.send(x);
  });
});

router.post("/dawn", (req, res) => {
  dawnscrapper().then((x) => {
    res.send(x);
  });
});

router.post("/propakistani", (req, res) => {
  propakistaniscrapper().then((x) => {
    res.send(x);
  });
});

module.exports = router;
