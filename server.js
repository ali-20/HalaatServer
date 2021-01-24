const express = require("express");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
require("./connection");
var Admin = require("./routes/Adminroutes");
var Users = require("./routes/Usersroutes");
var Articles = require("./routes/Scrapped_articleroutes");
var Writer = require("./routes/Writerroutes");
var cors = require("cors");
var pro = require("./routes/News_Scrapping/propakistaniscrapped");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//home route
app.get("/", (req, res) => {
  res.send("Welcome Home For Halaat Server");
});

app.use("/Users", Users);
app.use("/Admin", Admin);
app.use("/Articles", Articles);
app.use("/Writer", Writer);
