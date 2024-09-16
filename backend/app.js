const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);
app.listen(5000);
