const mysql = require("mysql");

var mysqlconnection = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b2db69a34adf99",
  password: "8f870e1b",
  database: "heroku_2f1b0ada4311605",
  multipleStatements: true,
});

mysqlconnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection successful");
  }
});

module.exports = mysqlconnection;
