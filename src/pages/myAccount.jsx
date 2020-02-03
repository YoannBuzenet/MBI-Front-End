import React from "react";

const myAccount = props => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container my-account">
        <h1>Mon compte</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" id="firstName" required />

          <label htmlFor="lastName">Nom</label>
          <input type="text" id="lastName" required />

          <label htmlFor="tel">Telephone</label>
          <input type="tel" id="tel" required />

          <label htmlFor="mail">Email</label>
          <input type="mail" id="mail" required />

          <label htmlFor="street-adress">Adresse</label>
          <textarea
            name="street-adress"
            id="street-adress"
            cols="22"
            rows="3"
            required
          ></textarea>

          <label htmlFor="postal-code">Code Postal</label>
          <input type="text" id="postal-code" required />

          <label htmlFor="town">Ville</label>
          <input type="text" id="town" required />

          <button type="submit">Modifier mes informations</button>
        </form>
      </div>
    </>
  );
};

export default myAccount;
