import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { useState } from "react";

function FormPage5() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="pf:p-4">
      {formData.payment_mode === "" && (
        <div className="pf:mb-4">
          You must select a payment mode first.
          <br />
          <NavButton
            mode="outline"
            action={() => navigate("/form_page4")}
            label="Select Payment Mode"
            fullWidth="false"
          />
        </div>
      )}
      {formData.payment_mode === "provide_banking_information" && (
        <div>
          <h1>Provide Banking Information</h1>

          <div className="pf:mb-2">
            <div className="pf:font-bold">Branch Transit Number</div>
            <div>A 5-digit number</div>

            <input
              type="number"
              name="branch_transit_number"
              placeholder="12345"
              className="pf:p-2 pf:border pf:border-gray-300 pf:rounded"
              value={formData.branch_transit_number}
              onChange={(e) => {
                dispatch(
                  updateField({
                    field: "branch_transit_number",
                    value: e.currentTarget.value,
                  })
                );
              }}
            />
          </div>
          <div className="pf:mb-2">
            <div className="pf:font-bold">Financial Institution Number</div>
            <div>A number</div>

            <input
              type="text"
              name="financial_institution_number"
              placeholder="Financial Institution Number"
              className="pf:p-2 pf:border pf:border-gray-300 pf:rounded"
              value={formData.financial_institution_number}
              onChange={(e) => {
                dispatch(
                  updateField({
                    field: "financial_institution_number",
                    value: e.currentTarget.value,
                  })
                );
              }}
            />
          </div>
          <div className="pf:mb-2">
            <div className="pf:font-bold">Bank Account Number</div>
            <div>Another number</div>

            <input
              type="text"
              name="bank_account_number"
              placeholder="Bank Account Number"
              className="pf:p-2 pf:border pf:border-gray-300 pf:rounded"
              value={formData.bank_account_number}
              onChange={(e) => {
                dispatch(
                  updateField({
                    field: "bank_account_number",
                    value: e.currentTarget.value,
                  })
                );
              }}
            />
          </div>
        </div>
      )}

      {formData.payment_mode === "provide_void_cheque" && (
        <div>
          {" "}
          <div>Upload a void cheque.</div>
          <input
            type="file"
            name="void_cheque"
            placeholder="Email"
            className="pf:p-2 pf:border pf:border-gray-300 pf:rounded"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  if (reader.result) {
                    const imageData = reader.result.toString();
                    dispatch(
                      updateField({
                        field: "void_cheque_image",
                        value: imageData,
                      })
                    );
                  }
                };
                reader.readAsDataURL(file);
              }

              // load image data from this file
            }}
          />
          {formData.void_cheque_image && formData.void_cheque_image > "" && (
            <div>
              <div className="max-w-[200px] max-h-[200px]">
                <img
                  className="pf:object-contain"
                  src={formData.void_cheque_image}
                />
              </div>
              <div className="pf:text-right pf:mb-4">
                <NavButton
                  mode="outline"
                  fullWidth="false"
                  action={() =>
                    dispatch(
                      updateField({
                        field: "void_cheque_image",
                        value: "",
                      })
                    )
                  }
                  label="Replace Image"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="pf:flex pf:gap-2">
        <NavButton
          mode="regular"
          action={() => navigate("/form_page6")}
          label={"Save and Continue"}
          currentPage="page5"
        />
      </div>
    </div>
  );
}

export default FormPage5;
