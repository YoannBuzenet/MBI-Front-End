import React from "react";
import ReactPDF from "@react-pdf/renderer";
import SellRequestRecap from "../../src/components/PDFtemplates/SellRequestRecapPDF";
import { IntlProvider } from "react-intl";
import config from "../../src/services/config";

export default function getPDFTranslated(locale, langName, sellRequestNumber) {
  //locale can be fr-FR or en-US
  //langName is either French or English for now

  ReactPDF.render(
    <IntlProvider
      locale={locale}
      messages={config.websiteDefaultLanguageContext[langName]}
    >
      <SellRequestRecap />
    </IntlProvider>,
    `${__dirname}/SellRequest${sellRequestNumber}.pdf`
  );
}
