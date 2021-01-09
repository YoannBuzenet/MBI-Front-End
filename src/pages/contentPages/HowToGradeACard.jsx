import React from "react";
import { FormattedMessage } from "react-intl";
import MTFront from "./content/gradingExamples/mintCardFront.png";
import MTBack from "./content/gradingExamples/mintCardBack.png";
import NMFront from "./content/gradingExamples/NMFront.png";
import NMTBack from "./content/gradingExamples/NMBack.png";
import ExcFront from "./content/gradingExamples/ExcFront.png";
import ExcBack from "./content/gradingExamples/ExcBack.png";
import GDFront from "./content/gradingExamples/GDFront.png";
import GDBack from "./content/gradingExamples/GDBack.png";
import LPFront from "./content/gradingExamples/LPFront.png";
import LPBack from "./content/gradingExamples/LPBack.png";
import PLFront from "./content/gradingExamples/PLFront.png";
import PLBack from "./content/gradingExamples/PLBack.png";
import POFront from "./content/gradingExamples/PoorFront.png";
import POBack from "./content/gradingExamples/PoorBack.png";
import cardSigned from "./content/gradingExamples/cardSigned.png";
import cardAltered from "./content/gradingExamples/cardAltered.png";

const HowToGradeACard = () => {
  return (
    <div className="container gradingPage">
      <h1>
        <FormattedMessage
          id="app.page.grading.title"
          defaultMessage="How to grade a Magic Card"
        />
      </h1>
      <p>
        <FormattedMessage
          id="app.page.grading.intro"
          defaultMessage="To grade accurately a card condition is a difficult task at first, but everyone gets better with time ! Thourgh this guide, we will try to show you how to recognize elements of condition, and class your card in the relevant condition."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.mint.title"
          defaultMessage="Mint (MT)"
        />
      </h2>
      <div className="cardPicture">
        <img src={MTFront} />
        <img src={MTBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.mint.description"
          defaultMessage="A mint card has no imperfection - we sometimes call it 'booster fresh'. Mint cards are really rare, because the smallest imperfection directly classes it as the lower condition, Near Mint. Mint condition is rarely used between players, mostly by collectors for high end cards."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.nearMint.title"
          defaultMessage="Near Mint (NM)"
        />
      </h2>
      <div className="cardPicture">
        <img src={NMFront} />
        <img src={NMTBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.nearMint.description"
          defaultMessage="Near Mint cards are mostly perfect. You can see rares small imperfections, but very lightly. The whole card looks really clean. It's the most used condition for cards or nearly perfect cards."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.exc.title"
          defaultMessage="Excellent (EX)"
        />
      </h2>
      <div className="cardPicture">
        <img src={ExcFront} />
        <img src={ExcBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.exc.description"
          defaultMessage="In the Exc condition, you begin to see a few imperfections here and there. They are visible, however the whole card looks still nice."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.good.title"
          defaultMessage="Good (GD)"
        />
      </h2>
      <div className="cardPicture">
        <img src={GDFront} />
        <img src={GDBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.good.description"
          defaultMessage="When a card is Good, imperfections are more visible. More imperfections can been seen."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.lightPlayed.title"
          defaultMessage="Light Played (LP)"
        />
      </h2>
      <div className="cardPicture">
        <img src={LPFront} />
        <img src={LPBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.lightPlayed.description"
          defaultMessage="Light Played cards begin to be really used. White traces on the borders or white points can been seen. The card has probably been played or used without sleeve for a while."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.Played.title"
          defaultMessage="Played (PL)"
        />
      </h2>
      <div className="cardPicture">
        <img src={PLFront} />
        <img src={PLBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.Played.description"
          defaultMessage="Played cards are really used. Defaults and imperfections can been seen all over the card. You see white marks, scratchs."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.poor.title"
          defaultMessage="Poor (PO)"
        />
      </h2>
      <div className="cardPicture">
        <img src={POFront} />
        <img src={POBack} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.poor.description"
          defaultMessage="Poor cards are the most used cards possible. On Poor cards, we either find something really radical, like the cards has been bent, wet, a part is missing, there's oil on it, or a really heavy used condition. A card that can recognized when played in a sleeve is Poor."
        />
      </p>
      <h3>
        <FormattedMessage
          id="app.page.grading.complementaryInformations.title"
          defaultMessage="Complementary Informations"
        />
      </h3>
      <h2>
        <FormattedMessage
          id="app.page.grading.signature.title"
          defaultMessage="Signature"
        />
      </h2>
      <div className="cardPicture">
        <img src={cardSigned} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.signature.description"
          defaultMessage="A card signed by its illustrator must be indicated. A lot of players like signed cards, other don't. Important details : the signature must come from the author, otherwise it counts as a inked card. One exception though : Richard Garfield signatures."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.alteration.title"
          defaultMessage="Alteration"
        />
      </h2>
      <div className="cardPicture">
        <img src={cardAltered} />
      </div>
      <p>
        <FormattedMessage
          id="app.page.grading.alteration.description"
          defaultMessage="An altered card has been modified on a part, if not the whole card."
        />
      </p>
      <h2>
        <FormattedMessage
          id="app.page.grading.conclusion.title"
          defaultMessage="Conclusion"
        />
      </h2>
      <p>
        <FormattedMessage
          id="app.page.grading.conclusion.description"
          defaultMessage="Conclusion"
        />
      </p>
    </div>
  );
};

export default HowToGradeACard;
