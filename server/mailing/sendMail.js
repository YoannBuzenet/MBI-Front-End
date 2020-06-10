const ejs = require("ejs");
const nodemailer = require("nodemailer");

function sendMail(mailRequest) {
  //TODO : Créer des templates ! Parcourir un Switch pour envoyer le bon template
  let template;
  switch (mailRequest.action) {
    case "cancel":
      //On fait une requete sur l'api centrale en tant que shop avec le jwt. Si on a une 200 alors on envoie le mail de cancel
      console.log("cancel sell request");
      console.log(mailRequest.action);

    default:
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

  let templateData = {
    user: { name: "Thomas" },
  };

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
