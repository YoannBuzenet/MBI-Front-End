import React from "react";
import { FormattedMessage } from "react-intl";
import AppLangChoice from "../components/AppLangChoice";

const Settings = (props) => {
  return (
    <>
      <h1>
        <FormattedMessage id="app.settings.title" defaultMessage={`Settings`} />
      </h1>
      <div className="container">
        <div className="settings-language-choice">
          <p>
            <FormattedMessage
              id="app.settings.language"
              defaultMessage={`Language`}
            />
          </p>
          <div className="language-select">
            <AppLangChoice />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
