const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { securityCheckAPI } = require("../services/securityCheckAPI");

function sendMail(mailRequest) {
  console.log(mailRequest);
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
  let currentSecurityLevel;
  let { token } = templateData.user;
  let userSellRequest = templateData.user.customer.SellRequests;
  let userShopSellRequest = templateData.shop
    ? templateData.shop.sellRequests
    : null;

  //TODO -> 1.On each case, API call must be implemented React side
  //TODO -> 2. Security API for logged user, shop user, non logged user

  switch (mailRequest.action) {
    case "welcomeEmail":
      //Unlogged user -> must implement follow up on IP/mail with DB
      //TODO: BIG Security Check
      template = __dirname + "/templates/welcomeEmail.ejs";
      break;
    case "submitted":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationSellRequestSubmitted.ejs";
      break;
    case "cards Sent":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreSent.ejs";
      break;
    case "received":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreReceived.ejs";
      break;
    case "beingProcessed":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestBeingProcessed.ejs";
      break;
    case "awaitingCustomerValidation":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestAwaitingValidation.ejs";
      break;
    case "validated":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestValidatedByShop.ejs";
      break;
    case "cancel":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/SellRequestCancellation.ejs";
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
      let userPermissionsCheck = await securityCheckAPI.checkIfUserIsReallyLogged(
        userSellRequest[0].id,
        token
      );
      return userPermissionsCheck.status === 200;
    } else if (currentSecurityLevel === AllSecurityLevels["shop"]) {
      //Checking if we can make an API request with the JWT as the logged shop
      let userShopPermissionsCheck = await securityCheckAPI.checkIfUserIsReallyLogged(
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

  securityCheckMailCanBeSent = checkSecurity(
    currentSecurityLevel,
    AllSecurityLevels,
    userSellRequest,
    token,
    userShopSellRequest
  );

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
      from: "ybuzenet@gmail.com",
      to: "thomas.g.guillot@gmail.com ",
      subject: "EJS Test File",
      html: html,
    };

    if (securityCheckMailCanBeSent) {
      // transport.sendMail(mailOpts, (err, info) => {
      //   if (err) console.log(err); //Handle Error
      //   console.log(info);
      // });
    }
  });
}

module.exports = { sendMail };
