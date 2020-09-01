const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { checkIfUserIsReallyLogged } = require("../services/securityCheckAPI");
const { langDefinition } = require("../../src/services/config");
const path = require("path");
const { createIntl, createIntlCache } = require("react-intl");
const {
  websiteDefaultLanguageArrayLangAvailables,
} = require("../../src/services/config");

async function sendMail(mailRequest) {
  // Translation Setup

  // This is optional but highly recommended
  // since it prevents memory leak
  const cache = createIntlCache();

  const intl = createIntl(
    {
      // Locale of the application
      locale: websiteDefaultLanguageArrayLangAvailables.find(
        (lang) => lang.langID === mailRequest.langID
      ).locale,
      // Locale of the fallback defaultMessage
      messages: websiteDefaultLanguageArrayLangAvailables.find(
        (lang) => lang.langID === mailRequest.langID
      ).translationsForUsersLocale,
    },
    cache
  );

  let template;
  // MailRequest.user doesn't have always the same data structure
  // Welcome email is different (see welcomeEmail.ejs)
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
      currentSecurityLevel = AllSecurityLevels["unlogged"];
      //TODO: ANTI SPAM Security Check (recaptcha ?)

      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID].toLowerCase() +
        "/welcomeEmail.ejs";
      mailOptions["to"] = templateData.user.data.email;

      const mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.welcomeEmail.title",
          defaultMessage: "Welcome on {url} !",
        },
        { url: process.env.REACT_APP_USER_FRIENDLY_URL }
      );

      // console.log(mailTitle);

      mailOptions["subject"] = mailTitle;

      break;

    case "submitted":
      console.log("Sell Request passed to status being submitted");
      currentSecurityLevel = AllSecurityLevels["logged"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
        langDefinition[mailRequest.langID].toLowerCase() +
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
    langDefinition[langID].toLowerCase() +
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
      subject: subject[langDefinition[langID].toLowerCase()],
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
