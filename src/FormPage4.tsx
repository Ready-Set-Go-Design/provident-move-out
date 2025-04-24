import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Radio, RadioField, RadioGroup } from "./components/radio";
import { Description, Label } from "./components/fieldset";
import { withPrefix } from "./utils/withPrefix";
import { Checkbox, CheckboxField } from "./components/checkbox";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";

function FormPage4() {
  const [mode, setMode] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page4");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Pre-Authorized Payments</h2>

      <div>
        <RadioGroup
          className={withPrefix(
            "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
            showValidationError && formData.payment_mode === ""
              ? "border-red-500"
              : "border-transparent"
          )}
          name="payment_mode"
          defaultValue="provide_banking_information"
          value={formData.payment_mode}
          onChange={(e) => {
            dispatch(
              updateField({
                field: "payment_mode",
                value: e,
              })
            );
          }}
        >
          <RadioField>
            <Radio value="provide_banking_information" color="green" />
            <Label>Provide banking information</Label>
            <Description>
              Customers can provide their banking information for payments.
            </Description>
          </RadioField>
          <RadioField>
            <Radio value="provide_void_cheque" color="green" />
            <Label>Provide a void cheque</Label>
            <Description>
              Customers can provide a void cheque for payments.
            </Description>
          </RadioField>
        </RadioGroup>
      </div>

      <CheckboxField
        className={withPrefix(
          "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
          showValidationError &&
            formData.accept_preauth_terms_and_conditions === ""
            ? "border-red-500"
            : "border-transparent"
        )}
      >
        <Checkbox
          color="green"
          name="accept_preauth_terms_and_conditions"
          value={formData.accept_preauth_terms_and_conditions}
          checked={formData.accept_preauth_terms_and_conditions === "true"}
          onChange={(checked) => {
            dispatch(
              updateField({
                field: "accept_preauth_terms_and_conditions",
                value: checked ? "true" : "",
              })
            );
          }}
        />
        <Label>I accept the terms and conditions of pre-auth payments</Label>
      </CheckboxField>

      <AllFieldsRequiredMessage show={showValidationError} id="/page4" />
      <div className={withPrefix("flex gap-2 mt-4")}>
        <NavButton
          outline={true}
          action={() => {
            dispatch(
              updateField({
                field: "accept_preauth_terms_and_conditions",
                value: "",
              })
            );
            dispatch(
              updateField({
                field: "payment_mode",
                value: "",
              })
            );
            navigate(from ? `/form_${from}` : "/form_page6");
          }}
          label={"Skip this step"}
        />

        <NavButton
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page5");
            } else {
              setShowValidationError(true);
            }
          }}
          label={"Save and Continue"}
          currentPage="page4"
        />
      </div>
    </div>
  );
}

export default FormPage4;
