const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { checkIfUserIsReallyLogged } = require("../services/securityCheckAPI");

async function sendMail(mailRequest) {
  //TODO : Traduire tous les templates
  //TODO : ajouter la langue dans l'object MailRequest React side et le traiter ici
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
  let { token } = mailRequest.user; // jwt

  let userSellRequest = mailRequest.user.customer.SellRequests;
  let userShopSellRequest = mailRequest.user.shop
    ? mailRequest.user.shop.sellRequests
    : null;

  let mailOptions = { from: "", to: "", subject: "" };

  //TODO -> 1.On each case, API call must be implemented React side
  //TODO -> 2. Security API for logged user, shop user, non logged user

  switch (mailRequest.action) {
    case "welcomeEmail":
      //Unlogged user -> must implement follow up on IP/mail with DB
      //TODO: BIG Security Check (captcha ?)
      //TODO : think about waiting for 200 http status from API to be sure we can send the mail
      template = __dirname + "/templates/welcomeEmail.ejs";
      mailOptions["to"] = ""; //TODO
      mailOptions[
        "subject"
      ] = `Bienvenue sur ${process.env.REACT_APP_EXPRESSAPI} !`;
      break;

    case "submitted":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationSellRequestSubmitted.ejs";
      mailOptions["to"] = process.env.MAIL_SHOP_SELL_REQUEST_NOTIFICATIONS;
      mailOptions["subject"] = "Un rachat vient d'être soumis";
      break;

    case "cards Sent":
      currentSecurityLevel = AllSecurityLevels["logged"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreSent.ejs";
      mailOptions["to"] = templateData.user.email;
      mailOptions["subject"] = "Vos cartes ont bien été notées comme envoyées.";
      break;

    case "received":
      currentSecurityLevel = AllSecurityLevels["shop"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };
      template = __dirname + "/templates/confirmationCardsAreReceived.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Les cartes de votre rachat n°${templateData.sellRequest.id} ont bien été reçues.`;
      break;

    case "beingProcessed":
      currentSecurityLevel = AllSecurityLevels["shop"];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };
      template =
        __dirname + "/templates/confirmationSellRequestBeingProcessed.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Votre rachat n°${templateData.sellRequest.id} est en cours de traitement.`;
      break;

    case "awaitingCustomerValidation":
      //TO DO -> check that the sell request is sent in info prop React Side
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };
      template =
        __dirname + "/templates/confirmationSellRequestAwaitingValidation.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Le rachat n°${templateData.sellRequest.id} est en attente de votre validation.`;
      break;

    case "validated":
      //TO DO -> check that the sell request is sent in info prop React Side
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };
      template =
        __dirname + "/templates/confirmationSellRequestValidatedByShop.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Le rachat n°${templateData.sellRequest.id} vient d'être validé.`;
      break;

    case "cancel":
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };
      template = __dirname + "/templates/SellRequestCancellation.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Le rachat ${templateData.sellRequest.id} a été annulé.`;
      break;

    default:
      break;
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
