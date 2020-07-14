// Core
require("dotenv").config();
require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const { sendMail } = require("./mailing/sendMail");
const fs = require("fs");
const securityCheckAPI = require("./services/securityCheckAPI");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

//Parse each call
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Removing security check that can block in localhost (it blocks if https is missing)
if (process.env.NODE_ENV === "dev") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

//Mail Processing
app.post("/api/mail", (req, res) => {
  console.log("Processing Mail");
  // console.trace(req.body.mailRequest);

  if (sendMail(req.body.mailRequest)) {
    res.send(200);
  } else {
    res.status(500).send("An error occurred");
  }
});

app.get("/api/PDF", (req, res) => {
  const { writePDF } = require("./PDF_handling/SellRequestServerTemplate");
  writePDF(
    {
      idSellRequest: 25,
      customer: {
        prenom: "Yoann",
        nom: "Buzenet",
        adress: "5 Rue Edouard Detaille",
        postalCode: "75017",
        town: "Paris",
      },
      sellRequests: [
        {
          condition: "2",
          foreignData: [],
          hasfoil: 1,
          hasnonfoil: 1,
          id: "36213",
          idSellRequestCard: 59,
          isAltered: false,
          isFoil: true,
          isSigned: false,
          lang: 9,
          mcmId: 285589,
          mkmPriceGuide: {},
          mkmSellPrice: 120,
          name: "Snapcaster Mage",
          price: 50,
          quantity: 2,
          scryfallid: "befab3d3-87ce-4b55-a6c9-51db8dd41f71",
          set: "Pro Tour Promos",
          uuid: "959d6de9-1171-542a-84f3-1a9fe4305532",
        },
        {
          condition: "6",
          foreignData: [],
          hasfoil: 1,
          hasnonfoil: 1,
          id: "36213",
          idSellRequestCard: 60,
          isAltered: false,
          isFoil: true,
          isSigned: false,
          lang: 9,
          mcmId: 285589,
          mkmPriceGuide: {},
          mkmSellPrice: 130,
          name: "Snapcaster MagAA",
          price: 25,
          quantity: 1,
          scryfallid: "befab3d3-87ce-4b55-a6c9-51db8dd41f71",
          set: "Pro Tour Promos",
          uuid: "959d6de9-1171-542a-84f3-1a9fe4305532",
        },
      ],
    },
    { legalName: "ShopNameYeah" },
    9
  );
  // const { getPDFTranslated } = require("./PDF_handling/React_SellRequestRecap");
  // getPDFTranslated("fr-FR", "French", 23);
  res.send("WIP");
});

// app.get("/api/test", (req, res) => {
//   console.log("test env.local", process.env.SMTP_NODEMAILER);
//   console.log("test env.local", process.env);
// });

//Shop Selling Settings
app.post("/api/shop/RewriteSellingSettings", async (req, res) => {
  //Check if this is the right shop (does he have the shop access & is the id the one of this server)
  console.log("Receiving selling settings");
  try {
    const securityCheck = await securityCheckAPI.checkIfUserIsCurrentShop(
      req.headers.authorization,
      req.body.id
    );

    //Writing the new selling settings in the file on the server
    const SellingSettings = req.body.authContext.shop.shopData.SellingSettings;
    fs.writeFile(
      __dirname + "/shopData/sellingsSettings.json",
      JSON.stringify(SellingSettings),
      (err) => console.log("after writing", err)
    );

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(401).send("Acces Denied.");
  }
});
app.post("/api/shop/TryToGetSellingSettings", async (req, res) => {
  console.log("sending selling settings");
  //Checking if this is the right shop (does he have the shop access & is the id the one of this server)
  try {
    const securityCheck = await securityCheckAPI.checkIfUserIsCurrentShop(
      req.headers.authorization,
      req.body.id
    );

    fs.readFile(__dirname + "/shopData/sellingsSettings.json", function (
      err,
      shopSettings
    ) {
      if (err) {
        console.log("fs error", err);
        res.status(500).send(err);
      }
      res.status(200).send(shopSettings);
    });
  } catch (err) {
    console.log("catch", err);
    res.status(401).send("Acces Denied.");
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log("App is listening on port " + port);
