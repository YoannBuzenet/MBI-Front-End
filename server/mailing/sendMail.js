const ejs = require("ejs");
const nodemailer = require("nodemailer");

function sendMail() {
  //TODO : Créer des templates ! Parcourir un Switch pour envoyer le bon template
  const template = "./dashboards/dashboard.ejs";

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
    name: "Test Name",
  };

  ejs.renderFile(template, templateData, (err, html) => {
    if (err) console.log(err); // Handle error

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "ybuzenet@gmail.com",
      to: "ybuzenet@gmail.com",
      subject: "EJS Test File",
      html: html,
    };

    transport.sendMail(mailOpts, (err, info) => {
      if (err) console.log(err); //Handle Error

      console.log(info);
    });
  });
}

module.exports = { sendMail };
