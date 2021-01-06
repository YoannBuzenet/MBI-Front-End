const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { checkIfUserIsReallyLogged } = require("../services/securityCheckAPI");
const { langDefinition } = require("../../src/services/config");
const path = require("path");
const { createIntl, createIntlCache } = require("react-intl");
const {
  websiteDefaultLanguageArrayLangAvailables,
} = require("../../src/services/config");
const fs = require("fs");

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

  let userSellRequest;

  if (mailRequest.user) {
    userSellRequest = mailRequest.user.customer;
    if (mailRequest.user.customer) {
      if (mailRequest.user.customer.sellRequests) {
        userSellRequest = mailRequest.user.customer.sellRequests;
      } else {
        //cf SellRequestValidation.jsx line 179
        if (mailRequest.infos.sellRequest) {
          userSellRequest = mailRequest.infos.sellRequest;
        } else {
          //cf SellRequestStatusUpdater line 114
          userSellRequest = mailRequest.infos;
        }
      }
    }
  }

  let userShopSellRequest = mailRequest.user.shop
    ? mailRequest.user.shop.sellRequests
    : null;

  //This object will be mutated during the Switch and hydrated with relevant data
  // BEWARE : structure will change following the mail sent, because we don't have access to the same data at each time
  let mailOptions = { from: "", to: "", subject: "", attachments: [] };
  let mailTitle;

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

      mailTitle = intl.formatMessage(
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
      mailOptions["to"] = templateData.user.user.email;

      mailTitle = intl.formatMessage({
        id: "server.sendMail.sellRequest.submitted",
        defaultMessage: "Your sell request has been submitted !",
      });

      mailOptions["subject"] = mailTitle;
      break;

    case "submittedShopNotification":
      console.log("Sell Request passed to status being submitted");
      currentSecurityLevel = AllSecurityLevels["logged"];
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID].toLowerCase() +
        "/shopMails/SellRequestSubmittedShopNotification.ejs";
      mailOptions["to"] = process.env.MAIL_SHOP_SELL_REQUEST_NOTIFICATIONS;

      mailTitle = intl.formatMessage({
        id: "server.sendMail.sellRequest.shopNotification.submitted",
        defaultMessage: "A new sell request has been submitted !",
      });

      mailOptions["subject"] = mailTitle;
      break;

    case "cardsSent":
      console.log("Sell Request passed to status being cards sents");
      currentSecurityLevel = AllSecurityLevels["logged"];
      templateData = {
        ...templateData,
        user: mailRequest.user,
        sellRequest: mailRequest.infos[0],
      };
      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID].toLowerCase() +
        "/confirmationCardsAreSent.ejs";
      mailOptions["to"] = templateData.user.user.email;

      mailTitle = intl.formatMessage({
        id: "server.sendMail.sellRequest.cardsHaveBeenSent",
        defaultMessage: "Your cards has been notified as sent.",
      });

      mailOptions["subject"] = mailTitle;
      break;

    case "received":
      console.log("Sell Request passed to status being received");
      currentSecurityLevel = AllSecurityLevels["shop"];
      templateData = {
        customer: mailRequest.infos.customer,
        sellRequest: mailRequest.infos,
        user: mailRequest.user,
      };

      template =
        __dirname +
        "/templates/" +
        langDefinition[mailRequest.langID].toLowerCase() +
        "/confirmationCardsAreReceived.ejs";
      mailOptions["to"] = mailRequest.infos.customer.user.email;

      mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.sellRequest.cardsHaveBeenReceived",
          defaultMessage:
            "Sell Request {sellRequestId} : Your cards have been received !",
        },
        { sellRequestId: templateData.sellRequest.id }
      );

      mailOptions["subject"] = mailTitle;
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

      mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.sellRequest.cardsBeingProcessed",
          defaultMessage:
            "Sell Request {sellRequestId} : Your cards are being processed.",
        },
        { sellRequestId: templateData.sellRequest.id }
      );

      mailOptions["subject"] = mailTitle;
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

      mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.sellRequest.awaitingCustomerValidation",
          defaultMessage:
            "Sell Request {sellRequestId} : Awaiting your validation.",
        },
        { sellRequestId: templateData.sellRequest.id }
      );

      mailOptions["subject"] = mailTitle;

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

      mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.sellRequest.validated",
          defaultMessage: "Sell Request {sellRequestId} has been validated !",
        },
        { sellRequestId: templateData.sellRequest.id }
      );

      mailOptions["subject"] = mailTitle;
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

      mailTitle = intl.formatMessage(
        {
          id: "server.sendMail.sellRequest.cancelled",
          defaultMessage: "Sell Request {sellRequestId} has been canceled.",
        },
        { sellRequestId: templateData.sellRequest.id }
      );

      mailOptions["subject"] = mailTitle;
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
    if (err) console.log("error while rendering ejs template", err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: process.env.MAIL_SENDING_FROM_SHOP,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
      attachments: mailOptions.attachments,
    };

    if (securityCheckMailCanBeSent) {
      transport.sendMail(mailOpts, (err, info) => {
        if (err) console.log("error while sending the mail", err); //Handle Error
        console.log("info", info);
        try {
          fs.unlink(
            path.join(
              __dirname,
              "../../server/PDF_handling/PDF_buffer/" +
                templateData?.sellRequest?.id +
                ".pdf"
            ),
            () => console.log("unlink PDf is done")
          );
        } catch (e) {
          console.log("error while trying to unlink pdf", e);
        }
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

  console.log("process.env.SMTP_NODEMAILER", process.env.SMTP_NODEMAILER);

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
      if (err) console.error("error while sending mail", err); //Handle Error
      console.log(info);
    });
    return true;
  });
}

module.exports = { sendMail, sendResetPasswordMail };
