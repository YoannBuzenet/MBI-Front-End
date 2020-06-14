const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { checkIfUserIsReallyLogged } = require("../services/securityCheckAPI");

async function sendMail(mailRequest) {
  //TODO : Traduire tous les templates
  //TODO : ajouter la langue dans l'object MailRequest React side
  let template;
  let templateData = {
    user: mailRequest.user,
  };

  //Security check params
  let securityCheckMailCanBeSent = true;
  let AllSecurityLevels = {
    unlogged: "unlogged",
    logged: "logged",
    shop: "shop",
  };
  let currentSecurityLevel; //Checking wether use is logged, shop or unlogged
  let { token } = templateData.user; // jwt

  let userSellRequest = templateData.user.customer.SellRequests;
  let userShopSellRequest = templateData.user.shop
    ? templateData.user.shop.sellRequests
    : null;

  let mailOptions = { from: "", to: "", subject: "" };

  //TODO -> 1.On each case, API call must be implemented React side
  //TODO -> 2. Security API for logged user, shop user, non logged user

  switch (mailRequest.action) {
    case "welcomeEmail":
      //Unlogged user -> must implement follow up on IP/mail with DB
      //TODO: BIG Security Check (captcha ?)
      template = __dirname + "/templates/welcomeEmail.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions[
        "subject"
      ] = `Bienvenue sur ${process.env.REACT_APP_EXPRESSAPI} !`;
      break;
    case "submitted":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationSellRequestSubmitted.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "cards Sent":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreSent.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "received":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreReceived.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "beingProcessed":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestBeingProcessed.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "awaitingCustomerValidation":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestAwaitingValidation.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "validated":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestValidatedByShop.ejs";
      mailOptions["from"] = "";
      mailOptions["to"] = "";
      mailOptions["subject"] = "";
      break;
    case "cancel":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/SellRequestCancellation.ejs";
      mailOptions["from"] = "zigguy@f.com";
      mailOptions["to"] = "ybuzenet@gmail.com";
      mailOptions["subject"] = "lol";
      console.log("on cancel");
      break;

    default:
      //TODO : what do we do in case of default ?
      template = __dirname + "/templates/confirmationInscriptionMail.ejs";
  }

  const checkSecurity = async (
    currentSecurityLevel,
    AllSecurityLevels,
    userSellRequest,
    token
  ) => {
    if (currentSecurityLevel === AllSecurityLevels["logged"]) {
      //Checking if we can make an API request with the JWT as a logged user
      let userPermissionsCheck = await checkIfUserIsReallyLogged(
        userSellRequest[0].id,
        token
      );
      return userPermissionsCheck.status === 200;
    } else if (currentSecurityLevel === AllSecurityLevels["shop"]) {
      //Checking if we can make an API request with the JWT as the logged shop
      let userShopPermissionsCheck = await checkIfUserIsReallyLogged(
        userShopSellRequest[0].id,
        token
      );
      return userShopPermissionsCheck.status === 200;
    } else if (currentSecurityLevel === AllSecurityLevels["unlogged"]) {
      //check unlog bro
      return true;
    } else {
      //This case shouldn't happen, if it happens, something shady is happening, we block the mail sending.
      return false;
    }
  };
  console.log("check auth 0", securityCheckMailCanBeSent);
  securityCheckMailCanBeSent = await checkSecurity(
    currentSecurityLevel,
    AllSecurityLevels,
    userSellRequest,
    token,
    userShopSellRequest
  );

  console.log("check auth 1", securityCheckMailCanBeSent);

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ybuzenet@gmail.com",
      pass: "Orel1977!",
    },
  });

  ejs.renderFile(template, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "ybuzenett@gmail.com",
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
    };

    if (securityCheckMailCanBeSent) {
      transport.sendMail(mailOpts, (err, info) => {
        if (err) console.log(err); //Handle Error
        console.log(info);
      });
    }
  });
}

module.exports = { sendMail };
