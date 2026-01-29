import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";

import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useEffect, useRef, useState } from "react";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { WrappedInput } from "./components/WrappedInput";
import { Radio, RadioField, RadioGroup } from "./components/radio";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const hasPerformedLookup = useRef(false);

  const [error, setError] = useState<string | null>(null);
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState<Array<string>>([]);
  const [maskedEmail, setMaskedEmail] = useState<string>("");
  const [tokenForVerification, setTokenForVerification] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(
    formData.code_verified === false ? true : false,
  );
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page3");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page3",
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verificationMethod, setVerificationMethod] = useState<string>("sms_0");
  const [verificationCodeSent, setVerificationCodeSent] =
    useState<boolean>(false);

  const sendVerificationCode = async () => {
    try {
      const sendCodeResponse = await fetch(
        `${(import.meta as any).env.VITE_API_URL}/validations/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: verificationMethod,
            token: tokenForVerification,
          }),
        },
      );
      if (!sendCodeResponse.ok) {
        setError(
          "There was an issue trying to send the verification code. Please try again.",
        );
        return;
      }

      const result = await sendCodeResponse.json();

      if (result.result == true) {
        setVerificationCodeSent(true);
        setError(null);
      } else {
        setError("The verification code could not be sent. Please try again.");
      }
    } catch (error) {
      setError("Failed to send verification code. Please try again.");
    }
  };

  useEffect(() => {
    if (formData.code_verified === false && !hasPerformedLookup.current) {
      // simulate loading for verification lookup
      setLoading(true);

      validateCustomerNumber();
    }
  });

  const validateCustomerNumber = async () => {
    try {
      const validateCN = await fetch(
        `${(import.meta as any).env.VITE_API_URL}/validations/validate-user-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_number: formData.customer_number,
            token: tokenForVerification,
          }),
        },
      );
      if (!validateCN.ok) {
        setError(
          "There was an issue trying to validate your customer number. Please try again.",
        );
      }

      const result = await validateCN.json();

      if (result.result == true) {
        // customer number is valid

        setMaskedPhoneNumber(result.data.phone.split(","));
        setMaskedEmail(result.data.email);
        setTokenForVerification(result.data.token);
        setError(null);
        setLoading(false);
      } else {
        setError(
          "The customer number you provided could not be validated. Please check your entry and try again.",
        );
      }
    } catch (error) {
      setError("Failed to validate customer number. Please try again.");
    }

    hasPerformedLookup.current = true;
  };

  const verifyCode = async () => {
    try {
      const validateCode = await fetch(
        `${(import.meta as any).env.VITE_API_URL}/validations/validate-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: verificationCode,
            token: tokenForVerification,
          }),
        },
      );
      if (!validateCode.ok) {
        setError(
          "There was an issue trying to validate your code. Please try again.",
        );
      }

      const result = await validateCode.json();

      if (result.result == true) {
        // customer number is valid

        dispatch(updateField({ field: "code_verified", value: true }));

        if (result.data) {
          dispatch(
            updateField({ field: "phone_number", value: result.data.phone }),
          );
          dispatch(updateField({ field: "email", value: result.data.email }));
        }
        setError(null);
        setLoading(false);
      } else {
        setError(
          "The code you provided could not be validated. Please check your entry and try again.",
        );
      }
    } catch (error) {
      setError("Failed to validate code. Please try again.");
    }

    hasPerformedLookup.current = true;
  };

  if (loading) {
    return (
      <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
        <h1 className={withPrefix("py-4 text-2xl")}>Occupant Verification</h1>
        <div>
          Validating customer number{" "}
          <span className={withPrefix("font-bold")}>
            {formData.customer_number}
          </span>
          ...
        </div>

        {error && (
          <div className={withPrefix("text-red-600 mt-4")}>{error}</div>
        )}

        {error && (
          <div className={withPrefix("flex mt-8")}>
            <div>
              <NavButton
                outline={true}
                action={() => {
                  navigate("/");
                }}
                label={"Start Over"}
                currentPage=""
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Occupant Verification</h1>

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
                : "border-transparent",
            )}
            name="selling_or_renting"
            defaultValue="selling"
            value={verificationMethod}
            onChange={(e) => {
              setVerificationMethod(e);
            }}
          >
            {maskedPhoneNumber.map((part, index) => (
              <RadioField key={`phone-${index}`}>
                <Radio value={`sms_${index}`} color="brand" />
                <Label>
                  SMS number ending in{" "}
                  <span className={withPrefix("font-bold")}>{part}</span>
                </Label>
              </RadioField>
            ))}

            <RadioField>
              <Radio value="email" color="brand" />
              <Label>
                Email{" "}
                <span className={withPrefix("font-bold")}>{maskedEmail}</span>
              </Label>
            </RadioField>
          </RadioGroup>
          {error && (
            <div className={withPrefix("text-red-600 mt-4")}>{error}</div>
          )}
        </div>
      )}

      {verificationCodeSent && !formData.code_verified && (
        <>
          <Field className={withPrefix("mb-4 mt-4")}>
            <Label className={withPrefix("text-sm font-semibold")}>
              Enter the 6-digit code below
            </Label>
            <WrappedInput
              showSearch={false}
              invalid={
                showValidationError && validatedForm?.errors.includes("Email")
              }
              type="text"
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
          {error && (
            <div className={withPrefix("text-red-600 mt-4")}>{error}</div>
          )}
        </>
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
                verifyCode();
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
              sendVerificationCode();
            }}
            currentPage="page3"
          />
        )}
      </FooterWrapper>
    </div>
  );
}

export default FormPage3;
