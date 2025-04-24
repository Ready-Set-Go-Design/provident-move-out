import { useLocation, useNavigate } from "react-router";

import NavButton from "./components/NavButton";
import AddressSearch from "./components/AddressSearch";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";

function FormPage2() {
  const navigate = useNavigate();
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page2");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Your service address</h2>

      <div>This is the address you're moving to.</div>
      <AddressSearch />

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/page2" />
        <NavButton
          label="Save and Continue"
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page3");
            } else {
              setShowValidationError(true);
            }
          }}
          currentPage="page2"
        />
      </div>
    </div>
  );
}

export default FormPage2;
