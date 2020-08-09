import React from "react";

const SetNewPassword = ({ match, history }) => {
  return (
    <>
      <h1>Set New Password</h1>
      <p>{match.params.challenge}</p>
    </>
  );
};

export default SetNewPassword;
