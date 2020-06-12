require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const { sendMail } = require("./mailing/sendMail");
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

//Parse each call
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

//Mail Processing
//TODO : Build an endpoint for each mail type
app.post("/api/mail", (req, res) => {
  console.log("Processing Mail");
  sendMail(req.body.mailRequest);
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
