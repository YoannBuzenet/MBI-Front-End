var PdfPrinter = require("pdfmake");
var fs = require("fs");
const path = require("path");
const moment = require("moment");

const config = require("../../src/services/config");
const {
  translation,
} = require("./Translations/Translation_SellRequestServerTemplate");

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

function writePDF(sellRequest, shopData, langID) {
  const langName = config.langDefinition[langID];

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

  var docDefinition = {
    content: [
      {
        text: `${translation.sellRequestName[langName]} N°${sellRequest.idSellRequest}`,
        style: "header",
      },
      {
        text: `${translation.FirstParagraphPart1[langName]}${sellRequest.customer.prenom} ${sellRequest.customer.nom},${translation.FirstParagraphPart2[langName]}${sellRequest.customer.adress}, ${sellRequest.customer.postalCode} ${sellRequest.customer.town}, ${translation.FirstParagraphPart3[langName]}${shopData.legalName}.`,
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
              {
                text: `${
                  translation.nombreDeCartes[langName]
                }${sellRequest.sellRequests.reduce(
                  (total, card) => total + card.quantity,
                  0
                )}`,
                style: "smallText",
              },
              {
                text: `${
                  translation.Total[langName]
                }${sellRequest.sellRequests.reduce(
                  (total, card) => total + card.quantity * card.price,
                  0
                )} `,
                style: "smallText",
              },
            ],
          ],
        },
      },
      {
        text:
          translation.IntroDate[langName] +
          moment().format(translation.FormatDate[langName]),
        style: "smallTextAlignRight",
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
      smallTextAlignRight: {
        fontSize: 9,
        alignment: "right",
      },
    },
  };
  var options;

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(
    fs.createWriteStream(
      path.join(
        __dirname,
        "../../server/PDF_handling/PDF_buffer/" +
          sellRequest.idSellRequest +
          ".pdf"
      )
    )
  );
  pdfDoc.end();
}

module.exports = { writePDF };
