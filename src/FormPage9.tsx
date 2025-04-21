import { useDispatch, useSelector } from "react-redux";
import { clearForm, updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { clear } from "console";

function FormPage9() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="pf:p-4">
      <div className="pf:mb-4">
        <h1>
          Thanks for completing the Customer Service Agreement with Provident
          Energy Management Inc.
        </h1>
        <div className="pf:mb-4 pf:mt-4">
          A copy of this contract will be sent to{" "}
          <strong>{formData.email}</strong>.
        </div>
      </div>

      <div className="pf:flex pf:gap-2">
        <NavButton
          mode="outline"
          action={() => {
            dispatch(clearForm());
            navigate("/");
          }}
          label={"Return to Homepage"}
          currentPage=""
        />
      </div>
    </div>
  );
}

export default FormPage9;
