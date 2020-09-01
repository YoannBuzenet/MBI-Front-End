import React from "react";
import { FormattedMessage } from "react-intl";

const ExplainationContainer = () => {
  return (
    <div className="explaination-container">
      <div className="explaination-text">
        <h3>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.title"
            defaultMessage={`How to Fix your selling prices`}
          />
        </h3>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph1"
            defaultMessage={`The selling price is set automatically following the criterias that you will indicate here.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph1bis"
            defaultMessage={`Please remind that you can always overwrite a specific price if you want, before adding it to your MKM stock.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph2"
            defaultMessage={`The selling price is set that way :`}
          />
        </p>
        <p>
          <span className="explaination-text-li-number">1.</span>{" "}
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph3"
            defaultMessage={`Get the MKM price from MKM you did choose : Price trend, or Average price on 7 days, etc...`}
          />
        </p>
        <p>
          <span className="explaination-text-li-number">2.</span>{" "}
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph4"
            defaultMessage={`The price is then passed into the Price Range you did set up below. Price range allow to round up prices (Example : if it's worth 6 on MKM, the shop sells it 8). You can disable this step if you want. We advise to disable it if you want to always have your selling prices fixed with only a percentage from the MKM trend.`}
          />
        </p>
        <p>
          <span className="explaination-text-li-number">3.</span>{" "}
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph5"
            defaultMessage={`Following the language, condition, and if it's foil or not, the price is modified following the percentage you fixed.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph6"
            defaultMessage={`Final Price = MKM Price You chose, passed eventually in Price Range, multiplied by percentage for Condition, Language, Foil`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph7"
            defaultMessage={`Said another way :`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part1"
            defaultMessage={`Final Price = `}
          />
          <span className="bold">
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part2"
              defaultMessage={`MKM Market Initial Price`}
            />
          </span>{" "}
          {"->"}{" "}
          <span className="bold">
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part3"
              defaultMessage={`Price Range`}
            />
          </span>{" "}
          X{" "}
          <span>
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part4"
              defaultMessage={`conditionPercentage`}
            />
          </span>{" "}
          X{" "}
          <span className="bold">
            <FormattedMessage
              id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.paragraph8part5"
              defaultMessage={`Language Percentage`}
            />
          </span>
        </p>
      </div>
      <div className="explaination-example">
        <h3>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.title"
            defaultMessage={`Example 1 :`}
          />
        </h3>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap1"
            defaultMessage={`A card is worth 1.24 of price trend euro on MKM. In your Price Range, you said that anything between 1 and 1.5 should be sold for 2.5 euros.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap2"
            defaultMessage={`The card is in Portuguese, Light Played, non foil. You added the following parameters : Portuguese : 70%, Light Played : 60%.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example1.paragrap3"
            defaultMessage={`Final Price will be : 2.5*0.7*0.6 = 1.05 euro because it's a Portuguese Light Played card you would have sold for 2.5 in your language of preference.`}
          />
        </p>
        <h3>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.title"
            defaultMessage={`Example 2 :`}
          />
        </h3>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph1"
            defaultMessage={`A card is worth 6.87 of price trend euro on MKM. In your Price Range, you said that anything between 6 and 7 should be sold for 8 euros.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph2"
            defaultMessage={`The card is in English, Exc, Foil. You added the following parameters in nthe Foil English column : Exc : 80%.`}
          />
        </p>
        <p>
          <FormattedMessage
            id="app.shop.shopSettings.sellingSettings.explaination.globalProcess.example2.paragraph3"
            defaultMessage={`Final Price will be : 8*1*0.8 = 6.4 euro because it's a English Exc card you would have sold for 8 in English Near Mint.`}
          />
        </p>
      </div>
    </div>
  );
};

export default ExplainationContainer;
