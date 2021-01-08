import React from "react";

const HowToGradeACard = () => {
  return (
    <>
      <p>
        Evaluer correctement l'état d'une carte à Magic est primordial. En
        effet, cela permet d'apprécier précisément sa valeur, et donc de mettre
        d'accord les joueurs lors d'une transaction. On parle d'évaluation de
        l'état d'une carte, ou plus rapidement de "grading" en anglais.
      </p>
      <p>
        Il y a plusieurs catégories d'états de carte, et votre carte rentre
        forcément dans l'une de ces catégories. Nous avons illustré les
        catégories avec des images pour aider, mais certaines cartes peuvent
        rester difficiles à évaluer. Pour cela, il vous faut également lire la
        description de l'état. Voyons voir !
      </p>
      <h2>Mint (Neuve)</h2>
      {/* img 1 // img 2  */}
      <p>
        La carte n'a aucune imperfection, et est comme neuve. Habituellement,
        l'évaluation "Mint" est très peu utilisée entre joueurs, et sert
        davantage aux collectionneurs pour des cartes plus chères.
      </p>
      <h2>Near-Mint (Presque neuve)</h2>
      {/* img 1 // img 2  */}
      <p>
        Les cartes Near-Mint sont presque neuves. On peut distinguer de rares
        imperfections, mais celles-ci doivent rester très légères. L'ensemble
        reste dans un état irréprochable. C'est la condition la plus usitée par
        les joueurs pour les cartes neuves ou quasi-neuves.{" "}
      </p>
      <h2>Excellent (Légèrement abimée)</h2>
      {/* img 1 // img 2  */}
      <p>
        En état Excellent, on commence à discerner quelques imperfections.
        Celles-ci sont visibles, bien que la carte reste en bon état sur
        l'ensemble.
      </p>
      <h2>Good (Un peu abimée)</h2>
      {/* img 1 // img 2  */}
      <p>
        En état Good, les imperfections se multiplient. Des traces blanches
        d'usure sont très distinctement visibles et la carte semble déjà avoir
        un peu vécu. Elle peut contenir des éraflures, ou quelques traces de
        frottement.
      </p>
      <h2>Light Played (Abimée)</h2>
      {/* img 1 // img 2  */}
      <p>
        Les cartes Light Played laissent apparaitre davantage d'usure. Des
        traces blanches très visibles parsèment la carte de part et d'autres.
        Celle-ci a été probablement endommagée en étant manipulée sans
        pochettes, ou lors d'un rangement périlleux. Les dommages restent
        toutefois raisonnables : la carte est encore jouable, n'a pas été
        marquée par une pliure, profondément déformée ou modifiée.
      </p>
      <h2>Played (Serieusement abimée)</h2>
      {/* img 1 // img 2  */}
      <p>
        Les cartes Played sont très marquées. Les usures et défauts sont
        présents sur toute la carte.
      </p>
      <h2>Poor (Très sérieusement abimée)</h2>
      {/* img 1 // img 2  */}
      <p>
        Les cartes Poor sont très abimées. Il peut y avoir soit beaucoup de
        petites usures cumulées, soit quelque chose de trop flagrant, qui
        affecte fortement la carte : typiquement une pliure, une marques au
        feutre, une carte tordue ou fortement gondolée. Les cartes qui sont trop
        usées pour être jouées en pochettes, c'est à dire encore reconnaissables
        malgré la pochette, rentrent également dans la catégorie Poor.
      </p>
      <h3>Informations complémentaires</h3>
      <h2>Signature</h2>
      {/* img 1 // img 2  */}
      <p>
        Une carte signée par son illustrateur doit être indiquée. Certains
        joueurs adorent cette pratique, d'autres préfèrent l'éviter. Tant que la
        signature reste discrète, cela n'affecte pas l'état de la carte.
      </p>
      <h2>Altération</h2>
      {/* img 1 // img 2  */}
      <p>
        Une carte altérée a été modifiée visuellement. Il existe plusieurs
        degrés d'altération : d'une légère modification à la réinvention totale
        de la carte. Les cartes qui ont été modifiées graphiquement doivent
        impérativement être indiquées comme altérées. Bien que ce travail
        d'artiste soit apprécié de tous, il reste une modification substancielle
        de la carte et son acquéreur doit être au courant.
      </p>
      <h2>Conclusion</h2>
      <p>
        L'évaluation de l'état d'une carte est un exercice particulier qui
        devient plus facile avec la pratique. En ce qu'elle est parfois une
        tâche difficile, nous vous recommandons d'être le plus strict possible
        lors de l'évaluation de l'état de vos cartes. Si vous hésitez entre deux
        états, le meilleur moyen de lever un doute est de grader la carte dans
        l'état le plus abimé, pas principe de prudence. Dans tous les cas, ne
        vous inquiétez pas, quelqu'un vérifiera au cas où. Bonne revente !
      </p>
    </>
  );
};

export default HowToGradeACard;
