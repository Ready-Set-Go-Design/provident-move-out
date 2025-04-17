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
      <div className="mb-4">
        <h1>Summary and confirmation</h1>

        <div>Occupancy Type: {formData.occupancy_type} </div>
        <div>Occupancy Date: {formData.occupancy_date}</div>

        <NavButton
          mode="outline"
          action={() => navigate("/")}
          label={"Edit"}
          fullWidth="false"
        />
      </div>

      <div className="flex gap-2">
        <NavButton
          mode="regular"
          action={() => navigate("/form_page8")}
          label={"Save and Continue"}
          currentPage="page7"
        />
      </div>
    </div>
  );
}

export default FormPage6;
