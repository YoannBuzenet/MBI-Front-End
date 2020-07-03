var PdfPrinter = require("pdfmake");
var fs = require("fs");

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

function writePDF() {
  var docDefinition = {
    content: [
      {
        layout: "lightHorizontalLines", // optional
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
              "First",
              "Second",
              "Third",
              "The last one",
              "First",
              "Second",
              "Third",
              "The last one",
              "The last one",
            ],
            [
              "Value 1",
              "Value 2",
              "Value 3",
              "Value 4",
              "Value 1",
              "Value 2",
              "Value 3",
              "Value 4",
              "Value 4",
            ],
            [
              { text: "Bold value", bold: true },
              "Val 2",
              "Val 3",
              "Val 4",
              "Val 2",
              "Val 3",
              "Val 4",
              "Val 4",
              "Val 4",
            ],
          ],
        },
      },
    ],
  };
  var options;
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream("document.pdf"));
  pdfDoc.end();
}

module.exports = { writePDF };
