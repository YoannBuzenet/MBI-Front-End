var PdfPrinter = require("pdfmake");
var fs = require("fs");

const config = require("../../src/services/config");
const translation = require("./Translations/Translation_SellRequestServerTemplate");

//https://pdfmake.github.io/docs/document-definition-object/tables/
//http://pdfmake.org/playground.html

var fonts = {
  Roboto: {
    normal: "node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf",
    bold: "node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf",
    italics: "node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf",
    bolditalics:
      "node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf",
  },
};

var printer = new PdfPrinter(fonts);

function writePDF(sellRequest, shopData) {
  const sellRequestData = sellRequest.sellRequests.map((card) => {
    return [
      { text: `${card.name}`, style: "smallText" },
      `${card.set}`,
      `${config.langDefinition[card.lang]}`,
      `${config.conditionDefinition[parseInt(card.condition)]}`,
      `${card.isFoil ? "Yes" : "No"}`,
      `${card.isSigned ? "Yes" : "No"}`,
      `${card.price}`,
      `${card.quantity}`,
      `${card.price * card.quantity}`,
    ];
  });
  console.log(sellRequestData);

  var docDefinition = {
    content: [
      { text: "SellRequest N°25", style: "header" },
      {
        text: `Je soussigné Madame/Monsieur ${sellRequest.customer.prenom} ${sellRequest.customer.nom}, habitant à ${sellRequest.customer.adress}, ${sellRequest.customer.postalCode} ${sellRequest.customer.town}, reconnait sur l'honneur avoir vendu les cartes suivantes à la société ${shopData.legalName}.`,
        style: "firstParagraph",
      },
      {
        layout: "lightHorizontalLines", // optional
        style: "table",
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
            "11.11%",
          ],

          body: [
            [
              { text: "Card", style: "tableHeader" },
              { text: "Set", style: "tableHeader" },
              { text: "Language", style: "tableHeaderLong" },
              { text: "Condition", style: "tableHeaderLong" },
              { text: "Foil", style: "tableHeader" },
              { text: "Signed", style: "tableHeader" },
              { text: "Price", style: "tableHeader" },
              { text: "Quantity", style: "tableHeader" },
              { text: "Total", style: "tableHeader" },
            ],
            ...sellRequestData,
            [
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              `Nombre de cartes : ${sellRequest.sellRequests.reduce(
                (total, card) => total + card.quantity
              )}`,
              `Total :${sellRequest.sellRequests.reduce(
                (total, card) => total + card.quantity * card.price
              )} `,
            ],
          ],
        },
      },
      { text: "Signature", style: "signature" },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      table: {
        margin: [0, 20],
      },
      firstParagraph: {
        margin: [0, 20],
      },
      signature: {
        fontSize: 18,
        bold: true,
        alignment: "right",
      },
      tableHeader: {
        fontSize: 11,
        alignment: "center",
      },
      tableHeaderLong: {
        fontSize: 9,
        alignment: "center",
      },
      smallText: {
        fontSize: 9,
      },
    },
  };
  var options;
  console.log([
    ...sellRequest.sellRequests.map((card) => {
      return [
        `${card.name}`,
        `${card.set}`,
        `${config.langDefinition[card.lang]}`,
        `${config.conditionDefinition[parseInt(card.condition)]}`,
        `${card.isFoil ? "Yes" : "No"}`,
        `${card.isSigned ? "Yes" : "No"}`,
        `${card.price}`,
        `${card.quantity}`,
        `${card.price * card.quantity}`,
      ];
    }),
  ]);
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream("document.pdf"));
  pdfDoc.end();
}

module.exports = { writePDF };
