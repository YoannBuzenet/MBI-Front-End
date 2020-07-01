import React from "react";
import ReactPDF from "@react-pdf/renderer";
import SellRequestRecap from "../../src/components/PDFtemplates/SellRequestRecapPDF";
import { IntlProvider } from "react-intl";

function getPDFTranslated(locale, langName) {
  //locale can be fr-FR or en-US
  //langName is either French or English for now

  ReactPDF.render(
    <IntlProvider locale={locale} messages={langName}>
      <SellRequestRecap />
    </IntlProvider>,
    `${__dirname}/example.pdf`
  );
}
