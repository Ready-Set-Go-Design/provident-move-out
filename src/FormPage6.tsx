import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";

function FormPage6() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="p-4">
      <div>
        <h1>Terms and Conditions</h1>

        <p>
          Provident Energy Management Inc. (“Provident”) has been retained
          pursuant to an Agreement (the “Master Agreement”) by the developer,
          the owner, the condominium corporation and/or the authorized agent, as
          applicable (the “Owner/Condominium”), of the premises in which the
          above‐noted Service Address is located and/or of premises that are
          invoiced for utilities that include utilities consumed at or by the
          above‐noted Service Address (the “Premises”) to supply the Services
          (as defined below) including meter reading, billing and collection
          services. The terms and conditions set out in this agreement comprise
          the legally binding agreement between the individual(s) named as
          Primary Account Holder and Secondary Account Holder (if any)
          (“Customer”) and Provident governing Customer’s use of the Services
          (as defined below). This Agreement is subject to Provident’s
          Conditions of Service (as applicable to the services provided by
          Provident at the Premises) (the “Conditions”), which may be accessed
          at www.pemi.com. In consideration of Provident providing the Services,
          and for other good and valuable consideration, the receipt of which is
          acknowledged by Customer, Customer acknowledges and agrees as follows:
        </p>

        <div className="mb-4 mt-4">
          <input
            type="checkbox"
            name="accept_terms_and_conditions"
            value=""
            checked={formData.accept_terms_and_conditions == "true"}
            onChange={(e) => {
              dispatch(
                updateField({
                  field: "accept_terms_and_conditions",
                  value: e.currentTarget.checked ? "true" : "",
                })
              );
            }}
          />{" "}
          I accept the terms and conditions of pre-auth payments
        </div>
      </div>

      <div className="flex gap-2">
        <NavButton
          mode="regular"
          action={() => navigate("/form_page7")}
          label={"Save and Continue"}
          currentPage="page6"
        />
      </div>
    </div>
  );
}

export default FormPage6;
