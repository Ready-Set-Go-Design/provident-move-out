import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "./components/input";
import { Radio, RadioField, RadioGroup } from "./components/radio";
import { Description, Label } from "./components/fieldset";
import clsx from "clsx";
import { withPrefix } from "./utils/withPrefix";
import { Checkbox, CheckboxField } from "./components/checkbox";

function FormPage4() {
  const [mode, setMode] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Pre-Authorized Payments</h2>

      <div>
        <RadioGroup
          name="payment_mode"
          defaultValue="provide_banking_information"
          value={formData.payment_mode}
          onChange={(e) => {
            console.log(e);
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

      <div>
        <CheckboxField>
          <Checkbox
            color="green"
            name="accept_preauth_terms_and_conditions"
            value={formData.accept_preauth_terms_and_conditions}
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
      </div>

      <div className={withPrefix("flex gap-2")}>
        {formData.payment_mode === "" && (
          <NavButton
            outline={true}
            action={() => navigate("/form_page6")}
            label={"Skip this step"}
          />
        )}

        <NavButton
          action={() => navigate("/form_page5")}
          label={"Save and Continue"}
          currentPage="page4"
        />
      </div>
    </div>
  );
}

export default FormPage4;
