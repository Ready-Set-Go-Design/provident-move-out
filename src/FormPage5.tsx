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
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage5() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page5");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page5",
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>Seller Information</h2>
      <main>
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>
            Lawyer first name
          </Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("lawyer_first_name")
            }
            type="text"
            name="lawyer_first_name"
            placeholder={""}
            value={formData.lawyer_first_name}
            onChange={(e: any) => {
              dispatch(updateField({ field: "lawyer_first_name", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "lawyer_first_name", value: "" }));
            }}
          />
        </Field>
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>
            Lawyer last name
          </Label>

          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("lawyer_last_name")
            }
            type="text"
            name="lawyer_last_name"
            placeholder={""}
            value={formData.lawyer_last_name}
            onChange={(e: any) => {
              dispatch(updateField({ field: "lawyer_last_name", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "lawyer_last_name", value: "" }));
            }}
          />
        </Field>
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>
            Lawyer phone
          </Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("lawyer_phone")
            }
            type="text"
            name="lawyer_phone_number"
            placeholder={""}
            value={formData.lawyer_phone_number}
            onChange={(e: any) => {
              dispatch(updateField({ field: "lawyer_phone_number", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(
                updateField({ field: "lawyer_phone_number", value: "" }),
              );
            }}
          />
        </Field>

        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page5"
          focusOnShow={true}
        />
      </main>
      <FooterWrapper>
        <NavButton
          label="Save and Continue"
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page6");
            } else {
              setShowValidationError(true);
            }
          }}
          currentPage="page5"
          disabledButClickable={!pageIsValid}
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage5;
