import React, { useState } from "react";
import Field from "./forms/Field";
import { FormattedMessage } from "react-intl";
import axios from "axios";

const ResetMail = () => {
  const [userMail, setUserMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUserMail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post
    console.log("submitted form");
  };

  return (
    <div className="reset-password">
      <h1>
        <FormattedMessage
          id="app.ResetMail.title"
          defaultMessage={`Forgot your password ?`}
        />
      </h1>
      <form className="login-form reset-password-form" onSubmit={handleSubmit}>
        <Field
          name="emailToReset"
          label={
            <FormattedMessage
              id="app.ResetMail.label.email"
              defaultMessage={`Please indicate your mail :`}
            />
          }
          value={userMail}
          onChange={handleChange}
          placeholder={
            <FormattedMessage
              id="app.LoginPage.placeholder.email"
              defaultMessage={`Mail`}
            />
          }
          className="form-group"
          type="email"
          required
        />
        {!isLoading && (
          <button type="submit" className="connecting-button">
            <FormattedMessage
              id="app.ResetMail.button.submit"
              defaultMessage={`Send me an email to reset my password`}
            />
          </button>
        )}
      </form>
    </div>
  );
};

export default ResetMail;
