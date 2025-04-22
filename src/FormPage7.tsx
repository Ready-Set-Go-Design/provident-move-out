import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { withPrefix } from "./utils/withPrefix";

function FormPage6() {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className={withPrefix("p-4")}>
      <div className={withPrefix("mb-4")}>
        <h1>Summary and confirmation</h1>

        <div>Occupancy Type: {formData.occupancy_type} </div>
        <div>
          Occupancy Date: {formData.occupancy_day}/{formData.occupancy_month}/
          {formData.occupancy_year}
        </div>

        <NavButton
          outline={true}
          action={() => navigate("/")}
          label={"Edit"}
          fullWidth="false"
        />
      </div>

      <div className={withPrefix("flex gap-2")}>
        <NavButton
          action={() => navigate("/form_page8")}
          label={"Save and Continue"}
          currentPage="page7"
        />
      </div>
    </div>
  );
}

export default FormPage6;
