import React from "react";
import MKMConnectModal from "../MKMConnectModal";
import { render } from "@testing-library/react";
import AuthContext from "../../../context/authContext";

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe("<MKMConnectModal>", () => {
  test("should be able to access auth context", () => {
    const providerProps = {
      authenticationInfos: {
        isAuthenticated: false,
        user: {
          id: "",
          email: "",
          roles: [],
        },
        customer: {
          id: "",
          prenom: "",
          nom: "",
          tel: "",
          adress: "",
          postalCode: "",
          town: "",
          sellRequests: [],
        },
        shop: {
          appToken: 54,
        },
      },
      setAuthenticationInfos: (value) => {},
    };
    customRender(<MKMConnectModal />, { providerProps });
    // expect(screen.getByText(/^My Name Is:/)).toHaveTextContent(
    //   "My Name Is: C3P0"
    // );
  });
});
