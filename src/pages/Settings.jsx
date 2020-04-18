import React from "react";
import { FormattedMessage } from "react-intl";

const Settings = (props) => {
  return (
    <h1>
      <FormattedMessage id="app.settings.title" defaultMessage={`Settings`} />
    </h1>
  );
};

export default Settings;
