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

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Primary Account Holder</h2>
      <Field className={withPrefix("mb-4")}>
        <Label>First Name</Label>

        <Input
          invalid={showValidationError && formData.first_name === ""}
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={(e) => {
            dispatch(
              updateField({ field: "first_name", value: e.currentTarget.value })
            );
          }}
        />
      </Field>
      <Field className={withPrefix("mb-4")}>
        <Label>Last Name</Label>
        <Input
          invalid={showValidationError && formData.last_name === ""}
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={(e) => {
            dispatch(
              updateField({ field: "last_name", value: e.currentTarget.value })
            );
          }}
        />
      </Field>

      {formData.occupancy_type.toLowerCase() !== "tenant" && (
        <Field className={withPrefix("mb-4")}>
          <Label>Business Name</Label>
          <Input
            invalid={showValidationError && formData.business_name === ""}
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={(e) => {
              dispatch(
                updateField({
                  field: "business_name",
                  value: e.currentTarget.value,
                })
              );
            }}
          />
        </Field>
      )}
      <Field className={withPrefix("mb-4")}>
        <Label>Email Address</Label>
        <Input
          invalid={
            showValidationError && validatedForm?.errors.includes("Email")
          }
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            dispatch(
              updateField({ field: "email", value: e.currentTarget.value })
            );
          }}
        />
      </Field>
      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/page3" />
        <NavButton
          label="Save and Continue"
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page4");
            } else {
              setShowValidationError(true);
            }
          }}
          currentPage="page3"
        />
      </div>
    </div>
  );
}

export default FormPage3;
