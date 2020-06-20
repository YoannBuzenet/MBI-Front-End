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

console.log("server is runnning en ENV : ", process.env.NODE_ENV);

//Removing security check that can block in localhost (it blocks if https is missing)
if (process.env.NODE_ENV === "dev") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

//Mail Processing
app.post("/api/mail", (req, res) => {
  console.log("Processing Mail");
  console.trace(req.body.mailRequest);
  sendMail(req.body.mailRequest);
});

//Shop Selling Settings
app.post("/api/shop/SellingSettings", (req, res) => {
  console.log("Receiving selling settings");
  //Check if this is the right shop (does he have the shop access & is the id the one of this server)
  //if yes, write into this file with stringy
  //if not, send back a 401
});
app.get("/api/shop/SellingSettings", (req, res) => {
  console.log("sending selling settings");
  //Check if this is the right shop (does he have the shop access & is the id the one of this server)
  //if yes, get the data and send it back, ready to be parsed
  //if not, send back a 401
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
