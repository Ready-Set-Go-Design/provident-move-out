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

function FormPage4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const [announceKey, setAnnounceKey] = useState<number>(0);
  const pageIsValid = isPageValid("/page4");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page4",
  );

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h2 className={withPrefix("py-4 text-2xl")}>Primary Account Holder</h2>
      <main>
        <Field className={withPrefix("mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>First name</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("first_name")
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

        <div className={withPrefix("text-md font-bold mt-8 mb-[-16px]")}>
          Forwarding Address
        </div>

        <Field className={withPrefix("mt-8 mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>Address</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("forwarding_address")
            }
            type="text"
            name="forwarding_address"
            placeholder={""}
            value={formData.forwarding_address}
            onChange={(e: any) => {
              dispatch(updateField({ field: "forwarding_address", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "forwarding_address", value: "" }));
            }}
          />
        </Field>
        <Field className={withPrefix("mt-8 mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>City</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("forwarding_city")
            }
            type="text"
            name="forwarding_city"
            placeholder={""}
            value={formData.forwarding_city}
            onChange={(e: any) => {
              dispatch(updateField({ field: "forwarding_city", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "forwarding_city", value: "" }));
            }}
          />
        </Field>
        <Field className={withPrefix("mt-8 mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>Province</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("forwarding_province")
            }
            type="text"
            name="forwarding_province"
            placeholder={""}
            value={formData.forwarding_province}
            onChange={(e: any) => {
              dispatch(updateField({ field: "forwarding_province", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(
                updateField({ field: "forwarding_province", value: "" }),
              );
            }}
          />
        </Field>
        <Field className={withPrefix("mt-8 mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>Country</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("forwarding_country")
            }
            type="text"
            name="forwarding_country"
            placeholder={""}
            value={formData.forwarding_country}
            onChange={(e: any) => {
              dispatch(updateField({ field: "forwarding_country", value: e }));
            }}
            clearAction={(e: any) => {
              dispatch(updateField({ field: "forwarding_country", value: "" }));
            }}
          />
        </Field>
        <Field className={withPrefix("mt-8 mb-4")}>
          <Label className={withPrefix("text-sm font-bold")}>Postal Code</Label>
          <WrappedInput
            showSearch={false}
            invalid={
              showValidationError &&
              validatedForm?.errors.includes("forwarding_postal_code")
            }
            type="text"
            name="forwarding_postal_code"
            placeholder={""}
            value={formData.forwarding_postal_code}
            onChange={(e: any) => {
              dispatch(
                updateField({ field: "forwarding_postal_code", value: e }),
              );
            }}
            clearAction={(e: any) => {
              dispatch(
                updateField({ field: "forwarding_postal_code", value: "" }),
              );
            }}
          />
        </Field>
      </main>
      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage
          show={showValidationError}
          id="/page4"
          focusOnShow={true}
          announceKey={announceKey}
        />
        <FooterWrapper>
          <NavButton
            label="Save and Continue"
            action={() => {
              if (pageIsValid) {
                navigate(from ? `/form_${from}` : "/form_page5");
              } else {
                setShowValidationError(true);
                setAnnounceKey((current) => current + 1);
              }
            }}
            currentPage="page4"
            disabledButClickable={!pageIsValid}
          />
        </FooterWrapper>
      </div>
    </div>
  );
}

export default FormPage4;
