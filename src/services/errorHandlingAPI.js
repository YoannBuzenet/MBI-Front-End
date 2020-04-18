import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import React from "react";

function check401Unauthorized(error) {
  if (error.response) {
    console.log(error.response);
    if (error.response.statusText === "Unauthorized") {
      toast.error(
        <FormattedMessage
          id="app.shop.shopSettings.toast.failure"
          defaultMessage={`The data couldn't be updated. Please try again.`}
        />
      );
      return true;
    }
  }
  return false;
}

export default { check401Unauthorized };
