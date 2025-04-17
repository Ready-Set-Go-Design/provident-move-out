import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";

import { RootState } from "./store/store";
import NavButton from "./components/NavButton";

const ServiceType = ({
  label,

  value,
  dispatch,
}: {
  label: string;
  value: string;

  dispatch: any;
}) => {
  const formData = useSelector((state: RootState) => state.form);
  const setServiceType = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(updateField({ field: "occupancy_type", value: value }));
  };

  return (
    <div
      className="bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-400"
      onClick={setServiceType}
    >
      <div>{formData.occupancy_type === value ? "●" : "○"}</div>
      {/* <div>Icon</div> */}
      {label}
    </div>
  );
};

function FormPage1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="p-4">
      <div></div>
      <h2>Customer Service Agreement</h2>

      <div>
        Please answer a few questions to better help us prepare your move in.
      </div>

      <div className="flex w-full">
        <ServiceType label="Tenant" value="TENANT" dispatch={dispatch} />
        <ServiceType
          label="Home Owner"
          value="HOME_OWNER"
          dispatch={dispatch}
        />
      </div>

      <div>
        <input
          type="date"
          placeholder="Enter occupancy date"
          value={formData.occupancy_date}
          onChange={(e) =>
            dispatch(
              updateField({ field: "occupancy_date", value: e.target.value })
            )
          }
        />
      </div>

      <p className="mt-4">
        <NavButton
          label="Save and Continue"
          action={() => navigate("/form_page2")}
          currentPage="page1"
        />
      </p>
    </div>
  );
}

export default FormPage1;
