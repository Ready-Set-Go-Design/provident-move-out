import { useLocation, useNavigate } from "react-router";

import NavButton from "./components/NavButton";
import AddressSearch from "./components/AddressSearch";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage2() {
  const navigate = useNavigate();
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page2");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");
  const formErrorId = "form-errors";
  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2
        className={withPrefix("py-4 text-2xl")}
        aria-label="Your Service Address"
      >
        Your Service Address
      </h2>
      <main>
        <div className={withPrefix("text-gray-500")}>
          This is the address you're leaving.
        </div>
        <AddressSearch />

        <AllFieldsRequiredMessage
          show={showValidationError}
          messageId={formErrorId}
          focusOnShow={true}
          id="/page2"
        />
      </main>
      <FooterWrapper>
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
          disabledButClickable={!pageIsValid}
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage2;
