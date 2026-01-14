import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";

import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useState } from "react";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { WrappedInput } from "./components/WrappedInput";
import { Radio, RadioField, RadioGroup } from "./components/radio";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page3");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page3"
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verificationMethod, setVerificationMethod] = useState<string>("sms");
  const [verificationCodeSent, setVerificationCodeSent] =
    useState<boolean>(false);

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Occupant verification</h1>

      <div className={withPrefix("text-sm font-semibold")}>
        You'll need to verify you are the occupant of the residence. Select a
        verification method below.{" "}
      </div>

      {!verificationCodeSent && !formData.code_verified && (
        <div className={withPrefix("mb-4")}>
          {" "}
          <RadioGroup
            className={withPrefix(
              "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
              showValidationError && formData.verificationMethod === ""
                ? "border-red-500"
                : "border-transparent"
            )}
            name="selling_or_renting"
            defaultValue="selling"
            value={verificationMethod}
            onChange={(e) => {
              setVerificationMethod(e);
            }}
          >
            <RadioField>
              <Radio value="sms" color="brand" />
              <Label>SMS number ending in 354</Label>
            </RadioField>
            <RadioField>
              <Radio value="email" color="brand" />
              <Label>Email da..np@gmail.com</Label>
            </RadioField>
          </RadioGroup>
        </div>
      )}

      {verificationCodeSent && !formData.code_verified && (
        <Field className={withPrefix("mb-4 mt-4")}>
          <Label className={withPrefix("text-sm font-semibold")}>
            Enter the 6-digit code below
          </Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError && validatedForm?.errors.includes("Email")
            }
            type="verification_code"
            name="verification_code"
            placeholder={""}
            value={verificationCode}
            onChange={(e: any) => {
              setVerificationCode(e);
            }}
            clearAction={(e: any) => {
              setVerificationCode("");
            }}
          />
        </Field>
      )}

      {formData.code_verified && (
        <div
          className={withPrefix("text-green-600 font-semibold text-md mt-4")}
        >
          Your identity has been successfully verified.
        </div>
      )}
      <AllFieldsRequiredMessage show={showValidationError} id="/page3" />

      <FooterWrapper>
        {(verificationCodeSent || formData.code_verified) && (
          <NavButton
            label={
              !formData.code_verified ? "Verify Code" : "Save and Continue"
            }
            action={async () => {
              if (!formData.code_verified && !pageIsValid) {
                // submit code verification call
                console.log("sending code for verification");
                dispatch(updateField({ field: "code_verified", value: true }));
                // this makes a fetch call, returning success or failure
              } else {
                if (pageIsValid) {
                  navigate(from ? `/form_${from}` : "/form_page4");
                } else {
                  setShowValidationError(true);
                }
              }
            }}
            currentPage="page3"
            disabledButClickable={
              !formData.code_verified && verificationCode.length != 6
            }
          />
        )}
        {!verificationCodeSent && !formData.code_verified && (
          <NavButton
            label="Send Code"
            action={async () => {
              // submit send code call
              console.log("sending code");
              setVerificationCodeSent(true);
            }}
            currentPage="page3"
          />
        )}
      </FooterWrapper>
    </div>
  );
}

export default FormPage3;
