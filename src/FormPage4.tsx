import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { Input } from "./components/input";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { useState } from "react";
import { validateForm } from "./utils/validateForm";
import { Field, Label } from "./components/fieldset";
import { WrappedInput } from "./components/WrappedInput";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page4");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page4"
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Primary Account Holder</h1>

      <Field className={withPrefix("mb-4")}>
        <Label className={withPrefix("text-sm font-bold")}>First name</Label>
        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError && validatedForm?.errors.includes("first_name")
          }
          type="text"
          name="first_name"
          placeholder={""}
          value={formData.first_name}
          onChange={(e: any) => {
            dispatch(updateField({ field: "first_name", value: e }));
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "first_name", value: "" }));
          }}
        />
      </Field>
      <Field className={withPrefix("mb-4")}>
        <Label className={withPrefix("text-sm font-bold")}>Last name</Label>

        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError && validatedForm?.errors.includes("last_name")
          }
          type="text"
          name="last_name"
          placeholder={""}
          value={formData.last_name}
          onChange={(e: any) => {
            dispatch(updateField({ field: "last_name", value: e }));
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "last_name", value: "" }));
          }}
        />
      </Field>
      <Field className={withPrefix("mb-4")}>
        <Label className={withPrefix("text-sm font-bold")}>
          Business name
          <br />
          <div className={withPrefix("font-normal text-gray-500 mb-1")}>
            If you wish this account be under a business enter the name below
          </div>
        </Label>
        <WrappedInput
          showSearch={false}
          invalid={
            showValidationError &&
            validatedForm?.errors.includes("business_name")
          }
          type="text"
          name="business_name"
          placeholder={""}
          value={formData.business_name}
          onChange={(e: any) => {
            dispatch(updateField({ field: "business_name", value: e }));
          }}
          clearAction={(e: any) => {
            dispatch(updateField({ field: "business_name", value: "" }));
          }}
        />
      </Field>

      <AllFieldsRequiredMessage show={showValidationError} id="/page4" />
      <FooterWrapper>
        <NavButton
          label="Save and Continue"
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page5");
            } else {
              setShowValidationError(true);
            }
          }}
          currentPage="page4"
          disabledButClickable={!pageIsValid}
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage4;
