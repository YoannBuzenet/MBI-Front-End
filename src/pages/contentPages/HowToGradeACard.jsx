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
      <h1>Grader une carte Magic</h1>
      <p>
        Evaluer correctement l'état d'une carte à Magic est une tâche ardue,
        mais on s'y fait ! Au cours de ce guide, nous allons essayer de vous
        montrer comment classer votre carte, selon quelques repères bien précis.
      </p>
      <h2>Mint/MT (Neuve)</h2>
      <div className="cardPicture">
        <img src={MTFront} />
        <img src={MTBack} />
      </div>
      <p>
        Quand la carte est Mint, elle n'a aucune imperfection, et est comme
        neuve. On dit parfois qu'elle est comme "sortie de booster". Les cartes
        Mint sont très rare car la plus petite imperfection la recale
        immédiatement au rang de Near-Mint. Habituellement, l'évaluation "Mint"
        est très peu utilisée entre joueurs, et sert davantage aux
        collectionneurs pour des cartes rares, et donc... plus chères.
      </p>
      <h2>Near-Mint/NM (Presque neuve)</h2>
      <div className="cardPicture">
        <img src={NMFront} />
        <img src={NMTBack} />
      </div>
      <p>
        Les cartes Near-Mint sont presque neuves. On peut distinguer de rares
        imperfections, mais celles-ci doivent rester très légères. L'ensemble
        reste dans un état irréprochable. C'est la condition la plus utilisée
        par les joueurs pour les cartes neuves ou quasi-neuves.{" "}
      </p>
      <h2>Excellent/EXC (Légèrement abimée)</h2>
      <div className="cardPicture">
        <img src={ExcFront} />
        <img src={ExcBack} />
      </div>
      <p>
        En état Excellent, on commence à discerner quelques imperfections.
        Celles-ci sont visibles, bien que la carte reste en bon état sur
        l'ensemble.
      </p>
      <h2>Good/GD (Un peu abimée)</h2>
      <div className="cardPicture">
        <img src={GDFront} />
        <img src={GDBack} />
      </div>
      <p>
        En état Good, les imperfections se multiplient. Des traces blanches
        d'usure sont très distinctement visibles et la carte semble déjà avoir
        un peu vécu. Elle peut contenir des éraflures, ou quelques traces de
        frottement.
      </p>
      <h2>Light Played/LP (Abimée)</h2>
      <div className="cardPicture">
        <img src={LPFront} />
        <img src={LPBack} />
      </div>
      <p>
        Les cartes Light Played laissent apparaitre davantage d'usure. Des
        traces blanches très visibles parsèment la carte de part et d'autres.
        Celle-ci a été probablement endommagée en étant manipulée sans
        pochettes, parfois à même le sol, ou abimée lors d'un rangement
        périlleux. Les dommages restent toutefois raisonnables : la carte est
        encore jouable, n'a pas été marquée par une pliure, profondément
        déformée ou modifiée.
      </p>
      <h2>Played/PL (Serieusement abimée)</h2>
      <div className="cardPicture">
        <img src={PLFront} />
        <img src={PLBack} />
      </div>
      <p>
        Les cartes Played sont très marquées. Les usures et défauts sont
        présents sur toute la carte. On voit des marques blanches, des rayures.
      </p>
      <h2>Poor/PO (Très sérieusement abimée)</h2>
      <div className="cardPicture">
        <img src={POFront} />
        <img src={POBack} />
      </div>
      <p>
        Les cartes Poor sont encore plus abimées. Pour les cartes Poor, on
        cherche quelque chose de radical : quelque chose de trop flagrant, qui
        affecte fortement la carte : typiquement une pliure, une marques au
        feutre, une carte tordue ou fortement gondolée, des restes d'eau... Les
        cartes qui sont trop usées pour être jouées en pochettes, c'est à dire
        encore reconnaissables malgré la pochette, rentrent également dans la
        catégorie Poor.
      </p>
      <h3>Informations complémentaires</h3>
      <h2>Signature</h2>
      <div className="cardPicture">
        <img src={cardSigned} />
      </div>
      <p>
        Une carte signée par son illustrateur doit être marquée comme telle.
        Certains joueurs adorent cette pratique, d'autres préfèrent l'éviter.
        Tant que la signature reste discrète, cela n'affecte pas l'état de la
        carte. Détail important : une carte signée par une autre personne que
        l'illustrateur devient une carte feutrée... exception faite si c'est
        Richard Garfield !
      </p>
      <h2>Altération</h2>
      <div className="cardPicture">
        <img src={cardAltered} />
      </div>
      <p>
        Une carte altérée a été modifiée visuellement. Il existe plusieurs
        degrés d'altération : d'une légère modification à la réinvention totale
        de la carte.
      </p>
      <h2>Conclusion</h2>
      <p>
        L'évaluation de l'état d'une carte est un exercice au début un peu
        complexe, qui devient plus facile avec la pratique. Si vous hésitez
        entre deux états, le meilleur moyen de lever un doute est de grader la
        carte dans l'état le plus abimé, pas principe de prudence. Dans tous les
        cas, ne vous inquiétez pas, quelqu'un de la boutique vérifiera au cas
        où. Bonne revente !
      </p>
    </div>
  );
};

export default HowToGradeACard;
