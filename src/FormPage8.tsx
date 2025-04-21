import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import SignatureCanvas from "react-signature-canvas";
import { useEffect, useRef } from "react";
import { isFormDataValid } from "./utils/isFormDataValid";

function FormPage8() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clearForm = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      dispatch(updateField({ field: "signature_image", value: "" }));
    }
  };

  useEffect(() => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    if (
      formData.signature_image &&
      sigCanvas.current &&
      formData.signature_image !== ""
    ) {
      sigCanvas.current.fromDataURL(formData.signature_image as string);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1>Signature</h1>

        <div>
          By typing your name in the fields below, you are legally signing this
          digital form.
        </div>

        <div className="border-2 border-gray-300 rounded p-4 mt-4">
          <SignatureCanvas
            penColor="green"
            canvasProps={{
              width: 500,
              height: 200,
              className: "sigCanvas",
            }}
            onEnd={() => {
              const base64 = sigCanvas.current?.toDataURL("image/png");
              if (base64) {
                dispatch(
                  updateField({
                    field: "signature_image",
                    value: base64 as string,
                  })
                );
              }
            }}
            ref={sigCanvas}
          />
          <NavButton
            outline={true}
            action={clearForm}
            label={"Clear"}
            fullWidth="false"
          />
        </div>
        <div className="mb-4 mt-4">
          <input
            type="checkbox"
            name="verify_entered_information"
            value=""
            checked={formData.verify_entered_information == "true"}
            onChange={(e) => {
              dispatch(
                updateField({
                  field: "verify_entered_information",
                  value: e.currentTarget.checked ? "true" : "",
                })
              );
            }}
          />{" "}
          I verify that all information entered is correct
        </div>
      </div>

      <div className="flex gap-2">
        <NavButton
          mode="regular"
          action={() => navigate("/form_page9")}
          label={"Submit"}
          currentPage="page8"
          disabled={isFormDataValid(formData) === false}
        />
      </div>
    </div>
  );
}

export default FormPage8;
