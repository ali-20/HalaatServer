const express = require("express");
var router = express.Router();
var mysqlconnection = require("../connection");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var VerifyToken = require("./VerifyToken");

router.post("/adminlogin", (req, res) => {
  var adminemail = req.body.email;
  var adminpassword = req.body.password;

  var query = "Select * from admin where Email=?";

  mysqlconnection.query(query, adminemail, (err, result) => {
    if (err) {
      res.json({
        Msg: "Something Went Wrong",
      });
    } else {
      if (result.length == 1) {
        if (result[0].Password == adminpassword) {
          var token = jwt.sign({ admin: result[0] }, process.env.TOKEN);

          res.json({
            user: result[0],
            TOKEN: token,
          });
        } else {
          res.json({
            Msg: "Invalid Password",
          });
        }
      } else if (result.length == 0) {
        res.json({
          Msg: "No Admin Found with this email",
        });
      } else {
        res.json({
          Msg: "Invalid Email",
        });
      }
    }
  });
});

router.post("/RegisterWriter", async (req, res) => {
  var Name = req.body.Name;
  var Email = req.body.Email;
  var ContactNo = req.body.ContactNo;
  var DOB = req.body.Dob;
  var password = req.body.password;

  var hashed = bcrypt.hashSync(password, 10);

  if (!req.files) {
    res.json({
      Msg: "Profile Picture is not uploaded",
    });
  }

  var image = req.files.uploaded_image;
  var image_name = image.name;
  var imagewithpath = __dirname + "/writersProfilePictures/" + image_name;

  if (
    image.mimetype == "image/jpeg" ||
    image.mimetype == "image/png" ||
    image.mimetype == "image/gif"
  ) {
    image.mv(__dirname + "/writersProfilePictures/" + image_name, (err) => {
      if (err) {
        res.json({
          Msg: "Failed to Upload for some reasons",
        });
      } else {
        var insertquery = `INSERT INTO writers 
                    (
                        Name,Email,cell,dob,profile_picture,password
                    )
                    VALUES
                    (
                        ?,?,?,?,?,?
                    )`;

        mysqlconnection.query(
          insertquery,
          [Name, Email, ContactNo, DOB, imagewithpath, hashed],
          (err, data) => {
            if (err) {
              if (err.errno == 1062) {
                res.json({
                  Msg: "Email already Exists",
                });
              }

              console.log(err);
              res.json({
                Msg: "Failed to Register in database",
              });
            } else {
              res.json({
                Msg: "Registered",
              });
              // res.json({
              //     "Writer_id":data[0]
              // })
            }
          }
        );
      }
    });
  } else {
    res.json({
      Msg: "File Type Must be Jpeg,png or gif",
    });
  }

  // profile.mv("Writers/profilepictures/"+imagename,(err)=>{
  //     if(err){

  //         res.send("failed to save the file")

  //     }

  //     else{

  //         res.send("picture saved")
  //     }
  // })
});

router.get("/getWritersDetail", (req, res) => {
  console.log(__dirname);

  var selectquery = `Select Writer_id, Name,Email,cell,dob,profile_picture from writers`;

  mysqlconnection.query(selectquery, (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      if (data.length == 0) {
        res.json({
          Msg: "No records have been found",
        });
      } else {
        var dataobj = [];

        for (var i = 0; i < data.length; i++) {
          var dataset = {
            Writer_id: data[i].Writer_id,
            Name: data[i].Name,
            Email: data[i].Email,
            cell: data[i].cell,
            dob: data[i].dob,
            profile_picture: data[i].profile_picture,
          };

          dataobj.push(dataset);
        }

        res.json({
          Data: dataobj,
        });
      }
    }
  });
});

router.get("/getArticleDetail", (req, res) => {
  var selectquery = `Select * from articles`;

  mysqlconnection.query(selectquery, (err, data) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      if (data.length == 0) {
        res.json({
          Msg: "No Articles have been found",
        });
      } else {
        res.json({
          Articles: data,
        });
      }
    }
  });
});

router.post("/approvearticle", VerifyToken, (req, res) => {
  const { ID } = req.body;

  const query = `UPDATE articles 
                SET article_status = ?
                WHERE articles_id=?;`;

  mysqlconnection.query(query, ["approved", ID], (err, result) => {
    if (err) {
      res.json({
        Msg: "Something went wrong",
      });
    } else {
      res.json({
        Msg: "Article Has been Approved",
      });
    }
  });
});

module.exports = router;
