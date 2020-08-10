const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { checkIfUserIsReallyLogged } = require("../services/securityCheckAPI");
const { langDefinition } = require("../../src/services/config");
const path = require("path");

async function sendMail(mailRequest) {
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

  let userSellRequest = mailRequest.user
    ? mailRequest.user.customer
      ? mailRequest.user.customer.SellRequests
      : null
    : null;
  let userShopSellRequest = mailRequest.user.shop
    ? mailRequest.user.shop.sellRequests
    : null;

  //This object will be mutated during the Switch and hydrated with relevant data
  let mailOptions = { from: "", to: "", subject: "", attachments: [] };

  //TODO -> Security on unlogged call (captcha)

  switch (mailRequest.action) {
    case "welcomeEmail":
      console.log("welcome Email", templateData);
      console.log("welcome Email", templateData.user.data.client);
      //TODO: BIG Security Check (captcha ?)
      //TODO : think about waiting for 200 http status from API to be sure we can send the mail
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/welcomeEmail.ejs";
      mailOptions["to"] = templateData.user.email;
      mailOptions[
        "subject"
      ] = `Bienvenue sur ${process.env.REACT_APP_EXPRESSAPI} !`;

      break;

    case "submitted":
      console.log("Sell Request passed to status being submitted");
      currentSecurityLevel = AllSecurityLevels["logged"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationSellRequestSubmitted.ejs";
      mailOptions["to"] = process.env.MAIL_SHOP_SELL_REQUEST_NOTIFICATIONS;
      mailOptions["subject"] = "Un rachat vient d'être soumis";
      break;

    case "cardsSent":
      console.log("Sell Request passed to status being cards sents");
      currentSecurityLevel = AllSecurityLevels["logged"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationCardsAreSent.ejs";
      mailOptions["to"] = templateData.user.email;
      mailOptions["subject"] = "Vos cartes ont bien été notées comme envoyées.";
      break;

    case "received":
      console.log("Sell Request passed to status being received");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
      };

      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationCardsAreReceived.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Les cartes de votre rachat n°${templateData.sellRequest.id} ont bien été reçues.`;
      break;

    case "beingProcessed":
      console.log("Sell Request passed to status being processed");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.user,
        sellRequest: mailRequest.infos,
      };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationSellRequestBeingProcessed.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Votre rachat n°${templateData.sellRequest.id} est en cours de traitement.`;
      break;

    case "awaitingCustomerValidation":
      console.log("Sell Request passed to status awaitingCustomerValidation");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.user,
        sellRequest: mailRequest.infos,
      };

      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationSellRequestAwaitingValidation.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Le rachat n°${templateData.sellRequest.id} est en attente de votre validation.`;

      const { writePDF } = require("../PDF_handling/SellRequestServerTemplate");
      writePDF(mailRequest.infos, mailRequest.user.shop, mailRequest.langID);
      //Attaching the PDF
      mailOptions.attachments = [
        {
          filename: "SellRequest" + templateData.sellRequest.id + ".pdf",
          path: path.join(
            __dirname,
            "../../server/PDF_handling/PDF_buffer/" +
              templateData.sellRequest.id +
              ".pdf"
          ),
        },
      ];

      break;

    case "validated":
      console.log("Sell Request passed to status validated");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.user,
        sellRequest: mailRequest.infos,
      };

      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/confirmationSellRequestValidatedByShop.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;
      mailOptions[
        "subject"
      ] = `Le rachat n°${templateData.sellRequest.id} vient d'être validé.`;
      break;

    case "cancel":
      console.log("Sell Request passed to status cancel");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        user: mailRequest.user,
        sellRequest: mailRequest.infos,
      };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID] +
        "/SellRequestCancellation.ejs";
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
      //TODO check unlog bro with captacha validation
      return true;
    } else {
      //This case shouldn't happen. Isf it happens, something shady is happening, we block the mail sending.
      return false;
    }
  };
  console.log("check auth 0, a priori true", securityCheckMailCanBeSent);
  securityCheckMailCanBeSent = await checkSecurity(
    currentSecurityLevel,
    AllSecurityLevels,
    userSellRequest,
    token,
    userShopSellRequest
  );

  console.log(
    "check auth 1, after check can we send ?",
    securityCheckMailCanBeSent
  );

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_NODEMAILER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  ejs.renderFile(template, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "testMail@gmail.com",
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
      attachments: mailOptions.attachments,
    };

    if (securityCheckMailCanBeSent) {
      transport.sendMail(mailOpts, (err, info) => {
        if (err) console.log(err); //Handle Error
        console.log(info);
        fs.unlink(
          path.join(
            __dirname,
            "../../server/PDF_handling/PDF_buffer/" +
              templateData.sellRequest.id +
              ".pdf"
          )
        );
      });
      return true;
    }
    return false;
  });
}

async function sendResetPasswordMail(userMail, langID, challenge) {
  let template =
    __dirname +
    "/templates/" +
    langDefinition[langID] +
    "/resetMailSendChallenge.ejs";

  let templateData = {
    challenge,
  };

  let subject = {
    french: "Réinitialisation de mot de passe",
    english: "Password Reset",
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_NODEMAILER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  ejs.renderFile(template, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: process.env.OFFICIAL_SMTP_MAIL_SENDING,
      to: userMail,
      subject: subject[langDefinition[langID]],
      html: html,
    };

    transport.sendMail(mailOpts, (err, info) => {
      if (err) console.log(err); //Handle Error
      console.log(info);
    });
    return true;
  });
}

module.exports = { sendMail, sendResetPasswordMail };
