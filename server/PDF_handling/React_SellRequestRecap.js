import React from "react";
import SellRequestTemplatePDF from "../../src/components/PDFtemplates/SellRequestTemplatePDF.jsx";
import ReactPDF from "@react-pdf/renderer";
import { IntlProvider } from "react-intl";
const config = require("../../src/services/config");

function getPDFTranslated(locale, langName, sellRequestNumber) {
  //   locale can be fr-FR or en-US
  //   langName is either French or English for now
  ReactPDF.render(
    <IntlProvider
      locale={locale}
      messages={config.websiteDefaultLanguageContext[langName]}
    >
      <SellRequestTemplatePDF />
    </IntlProvider>,
    `${__dirname}/SellRequest${sellRequestNumber}.pdf`
  );
}

module.exports = { getPDFTranslated };
