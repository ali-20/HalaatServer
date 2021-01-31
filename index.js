const express = require("express");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
require("./connection");
var Admin = require("./routes/Adminroutes");
var Users = require("./routes/Usersroutes");
var Articles = require("./routes/Scrapped_articleroutes");
var Writer = require("./routes/Writerroutes");
var cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(fileUpload());

// var allowedOrigins = [
//   "https://halaatowaqiat.netlify.app",
//   "https://halaatportal.netlify.app",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin
//       // (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

const PORT = 5000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//home route
app.get("/", (req, res) => {
  res.json({
    MSg: "welcome to halaat server",
  });
});

app.use("/Users", Users);
app.use("/Admin", Admin);
app.use("/Articles", Articles);
app.use("/Writer", Writer);
