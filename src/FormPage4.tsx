import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { useState } from "react";

function FormPage3() {
  const [mode, setMode] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="pf:p-4">
      <div></div>
      <h2>Pre-Authorized Payments</h2>

      {mode}
      <div>
        <div>
          <input
            type="radio"
            name="payment_mode"
            className="pf:m-2"
            value="provide_banking_information"
            onClick={(e) => {
              dispatch(
                updateField({
                  field: "payment_mode",
                  value:
                    formData.payment_mode !== "provide_banking_information"
                      ? e.currentTarget.value
                      : "",
                })
              );
            }}
            checked={formData.payment_mode === "provide_banking_information"}
          />
          Provide banking information
        </div>
        <div>
          <input
            type="radio"
            name="payment_mode"
            value="provide_void_cheque"
            className="pf:m-2"
            onClick={(e) => {
              console.log(formData.payment_mode);
              dispatch(
                updateField({
                  field: "payment_mode",
                  value:
                    formData.payment_mode !== "provide_void_cheque"
                      ? e.currentTarget.value
                      : "",
                })
              );
            }}
            checked={formData.payment_mode === "provide_void_cheque"}
          />
          Provide a void cheque
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          name="accept_preauth_terms_and_conditions"
          value=""
          checked={formData.accept_preauth_terms_and_conditions == "true"}
          onChange={(e) => {
            dispatch(
              updateField({
                field: "accept_preauth_terms_and_conditions",
                value: e.currentTarget.checked ? "true" : "",
              })
            );
          }}
        />{" "}
        I accept the terms and conditions of pre-auth payments
      </div>

      <div className="pf:flex pf:gap-2">
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

export default FormPage3;
