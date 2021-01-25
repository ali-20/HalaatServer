const express = require("express");
var router = express.Router();
var mysqlconnection = require("../connection");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var VerifyToken = require("./VerifyToken");

router.post("/writerlogin", (req, res) => {
  const { email, password } = req.body;

  const query = `select * from writers where Email=? `;
  mysqlconnection.query(query, [email], (err, result) => {
    if (err) {
      res.send(err.name);
    } else {
      if (result.length == 1) {
        const pass = result[0].password;
        const writerid = result[0].Writer_id;

        const verifypass = bcrypt.compareSync(password, pass);

        if (verifypass) {
          const token = jwt.sign({ User: result[0] }, process.env.TOKEN);
          res.json({
            Writer: result[0],
            TOKEN: token,
          });
        } else {
          res.json({
            Msg: "Invalid Credentials",
          });
        }
      } else if (result.length == 0) {
        res.json({
          Msg: "No User found",
        });
      } else {
        res.json({
          Msg: "Something went Wrong",
        });
      }
    }
  });
});

router.post("/publisharticle", VerifyToken, (req, res) => {
  const {
    heading,
    body,
    category,
    imageurl,
    writer,
    status,
    publisheddate,
  } = req.body;

  const insertquery = `insert into articles (article_heading, article_body,article_category,article_image,article_writer,article_status,published_at) values(?,?,?,?,?,?,?)`;

  mysqlconnection.query(
    insertquery,
    [heading, body, category, imageurl, writer, status, publisheddate],
    (err, result) => {
      if (err) {
        res.send(err);
        res.json({
          Msg: "There has been some problem in publishing the article",
        });
      } else {
        res.json({
          Msg:
            "Article Has been sent, it will be reviewed and published Shortly",
        });
      }
    }
  );
});

module.exports = router;
