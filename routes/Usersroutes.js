const express = require("express");
var router = express.Router();
var mysqlconnection = require("../connection");
var bcrypt = require("bcrypt");
const e = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var verifytoken = require("./VerifyToken");

// Register Route for bew halaat User

router.post("/register", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var email = req.body.email;
  var name = req.body.name;
  var password = req.body.password;
  var saltRounds = 10;

  //hashing password

  var salt = bcrypt.genSaltSync(saltRounds);
  var hashedpassword = bcrypt.hashSync(password, salt);
  var insertquery = `INSERT INTO halaatusers 
                (
                    user_name,user_email,user_password
                )
                VALUES
                (
                    ?, ?, ?
                )`;

  var selectquery = "select * from halaatusers where user_email=?";

  mysqlconnection.query(selectquery, [email], (err, result) => {
    if (err) {
      res.json({
        error: "Something went wrong",
      });
    }

    if (result.length == 0) {
      mysqlconnection.query(
        insertquery,
        [name, email, hashedpassword],
        (err, result) => {
          if (err) {
            res.json({
              error: "Unable to Register",
            });
          } else {
            res.json({
              Msg: "Registeration Successfull",
            });
          }
        }
      );
    } else {
      res.json({
        error: "User with this Email already Exists",
      });
    }
  });

  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //     bcrypt.hash(password, salt, function(err, hash) {

  //         if(err){
  //             console.log(err)
  //         }

  //         else{
  //             // Inserting the user data after verifying

  //         mysqlconnection.query(insertquery, [name,email,hash], function (err, data) {
  //     if (err) {

  //             // if Email already exists it returns error code 1062 duplicate value of email
  //             if(err.errno==1062){
  //                 res.json({
  //                     "error": "User with this email already exists",
  //                 })
  //             }
  //             else{
  //                 res.send(false)
  //             }

  //     } else {
  //         // successfully inserted into db
  //         res.send(true)
  //         console.log("succesfully inserted")
  //     }
  // });
  //         }

  //     });
  // });
});

//Login Route for Halaat User

router.post("/Login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var email = req.body.email;
  var pass = req.body.password;
  var q = "select * from halaatusers where user_email=?";

  mysqlconnection.query(q, [email], (err, result) => {
    if (err) {
      res.json({
        error: "Something went wrong",
      });
    } else {
      if (result.length == 0) {
        res.json({
          error: "No User found with this email",
        });
      } else if (result.length == 1) {
        var verifiedpass = bcrypt.compareSync(pass, result[0].user_password);

        if (verifiedpass) {
          const token = jwt.sign({ user: result[0] }, process.env.TOKEN);
          res.json({
            auth: true,
            token: token,
            Email: result[0].user_email,
          });
        } else {
          res.json({
            error: "Password does not match",
          });
        }
      }
    }
  });

  // mysqlconnection.query(q,[email], (err,data)=>{

  //     if(err){
  //         res.json({
  //             "error":err.name,
  //         })
  //     }

  //     else{

  //         if(data.length>0 && data.length<2){

  //             var dbpass=data[0].user_password.trim();
  //             var dbid=data[0].user_id;
  //             console.log(dbpass)
  //             bcrypt.compare(pass,dbpass,(err,same)=>{
  //                 if(err){

  //                     res.send(false)
  //                 }
  //                 else{

  //                     if(same){

  //                         const token=jwt.sign({id:dbid},process.env.TOKEN)
  //                         res.json({
  //                             "auth":true,
  //                             "token":token,
  //                             "data":data[0]
  //                         })
  //                     }
  //                     else{
  //                         res.json({
  //                             "error":"Password Does not match",

  //                         })
  //                     }
  //                 }
  //             })

  //         }

  //         else{
  //             res.json({
  //                 "error":"User does not exist with this email"
  //             })
  //         }
  //     }

  // })
});

router.get("/Fetch/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  const query = `select * from articles 
    where articles_id=? && article_status=?;`;

  mysqlconnection.query(query, [id, "approved"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    } else {
      if (result.length == 0) {
        res.json({
          Msg: "No Articles Found",
        });
      } else {
        res.json({
          articles: result,
        });
      }
    }
  });
});

router.get("/Fetchall", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=?;`;

  mysqlconnection.query(query, ["approved"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchGeneral", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "General"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchTech", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "Tech"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchSports", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "Sports"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchEducation", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "Education"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchBusiness", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "Business"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.get("/FetchHealth", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = `select * from articles 
    where article_status=? && article_category=?;`;

  mysqlconnection.query(query, ["approved", "Health"], (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        Msg: "Failed to Fetch Resources",
      });
    }

    if (result.length == 0) {
      res.json({
        Msg: "No Articles Found",
      });
    } else {
      res.json({
        articles: result,
      });
    }
  });
});

router.post("/insertfavorite", verifytoken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const {
    Email,
    article_id,
    article_heading,
    article_body,
    article_category,
    article_image,
    date_published,
    writer,
  } = req.body;

  const query = `insert into favorite_articles (user_email,articles_id,article_heading,article_body,article_category,article_image,article_writer,published_at) 
    values (?,?,?,?,?,?,?,?);`;

  mysqlconnection.query(
    query,
    [
      Email,
      article_id,
      article_heading,
      article_body,
      article_category,
      article_image,
      date_published,
      writer,
    ],
    (err, result) => {
      if (err) {
        if (err.errno == 1062) {
          res.json({
            Error: "Article Already in your favorites",
          });
        } else {
          console.log(err);
          res.json({
            Error: "Something went wrong",
          });
        }
      } else {
        res.json({
          Msg: "Added to Favorites",
        });
      }
    }
  );
});

router.post("/fetchfavorites", verifytoken, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { Email } = req.body;

  const query = `select * from favorite_articles where user_email=?;`;

  mysqlconnection.query(query, [Email], (err, result) => {
    if (err) {
      res.json({
        Error: "Something Went Wrong",
      });
    } else {
      if (result.length == 0) {
        res.json({
          Msg: "You have not saved any articles right now",
        });
      } else {
        res.json({
          articles: result,
        });
      }
    }
  });
});

module.exports = router;
