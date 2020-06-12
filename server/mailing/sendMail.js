const ejs = require("ejs");
const nodemailer = require("nodemailer");

function sendMail(mailRequest) {
  //TODO : Traduire tous les templates
  //TODO : ajouter la langue dans l'object MailRequest React side
  let template;
  let templateData = {
    user: mailRequest.user,
  };

  //TODO -> On each case, API call must be implemented React side
  switch (mailRequest.action) {
    case "welcomeEmail":
      //Unlogged user -> must implement follow up on IP/mail with DB
      //TODO: Security Check
      template = __dirname + "/templates/welcomeEmail.ejs";
      break;
    case "submitted":
      //Logged user security
      //TO DO -> check that the sell request is sent in info prop React Side
      templateData = { ...templateData, sellRequest: mailRequest.infos };
      template = __dirname + "/templates/confirmationSellRequestSubmitted.ejs";
      break;
    case "cards Sent":
      //Logged user security
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
    console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "ybuzenet@gmail.com",
      to: "thomas.g.guillot@gmail.com ",
      subject: "EJS Test File",
      html: html,
    };

    // transport.sendMail(mailOpts, (err, info) => {
    //   if (err) console.log(err); //Handle Error

    //   console.log(info);
    // });
  });
}

module.exports = { sendMail };
