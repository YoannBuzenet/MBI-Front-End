const ejs = require("ejs");
const nodemailer = require("nodemailer");
const { securityCheckAPI } = require("../services/securityCheckAPI");

function sendMail(mailRequest) {
  //TODO : Traduire tous les templates
  //TODO : ajouter la langue dans l'object MailRequest React side
  let template;
  let templateData = {
    user: mailRequest.user,
  };

  //Security check params
  let securityCheckMailCanBeSent = true;
  let AllSecurityLevels = { unlogged, logged, shop };
  let currentSecurityLevel;
  let { token } = template.user;
  let { userSellRequest } = templateData.user.customer.SellRequests;

  //TODO -> 1.On each case, API call must be implemented React side
  //TODO -> 2. Security API for logged user, shop user, non logged user

  switch (mailRequest.action) {
    case "welcomeEmail":
      //Unlogged user -> must implement follow up on IP/mail with DB
      //TODO: BIG Security Check
      template = __dirname + "/templates/welcomeEmail.ejs";
      break;
    case "submitted":
      //Logged user security
      currentSecurityLevel = AllSecurityLevels[logged];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationSellRequestSubmitted.ejs";
      break;
    case "cards Sent":
      //Logged user security
      currentSecurityLevel = AllSecurityLevels[logged];
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreSent.ejs";
      break;
    case "received":
      //SHOP user security
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationCardsAreReceived.ejs";
      break;
    case "beingProcessed":
      //SHOP user security
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestBeingProcessed.ejs";
      break;
    case "awaitingCustomerValidation":
      //SHOP user security
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestAwaitingValidation.ejs";
      break;
    case "validated":
      //SHOP user security
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template =
        __dirname + "/templates/confirmationSellRequestValidatedByShop.ejs";
      break;
    case "cancel":
      //SHOP user security
      //On fait une requete sur l'api centrale en tant que shop avec le jwt. Si on a une 200 alors on envoie le mail de cancel
      //TO DO : CALL TO CHECK USER RIGHTS
      console.log("action : cancel -> cancel sell request");
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
    if (currentSecurityLevel === AllSecurityLevels[logged]) {
      securityCheckMailCanBeSent = await securityCheckAPI.checkIfUserIsReallyLogged(
        userSellRequest[0],
        token
      );
      return securityCheckMailCanBeSent.status === 200;
    } else if (currentSecurityLevel === AllSecurityLevels[shop]) {
      //Check logged shop
      return true;
    } else if (currentSecurityLevel === AllSecurityLevels[unlogged]) {
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
    token
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
    console.log(templateData);
    console.log(templateData.user.customer.SellRequests);
    console.log(template);

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
