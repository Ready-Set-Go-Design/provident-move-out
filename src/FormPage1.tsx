import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";

import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { Select } from "./components/select";
import { withPrefix } from "./utils/withPrefix";
import { isPageValid } from "./utils/isPageValid";
import { useState } from "react";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";

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
      className={withPrefix(
        "bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-400 w-full"
      )}
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
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");

  const pageIsValid = isPageValid("/");

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Customer Service Agreement</h2>

      <div>
        Please answer a few questions to better help us prepare your move in.
      </div>

      <div
        className={withPrefix(
          "inline-flex gap-2 w-full rounded-md pf:overflow-hidden border-1",
          showValidationError && formData.occupancy_type === ""
            ? "border-red-500"
            : "border-transparent"
        )}
      >
        <ServiceType label="Tenant" value="TENANT" dispatch={dispatch} />
        <ServiceType
          label="Home Owner"
          value="HOME_OWNER"
          dispatch={dispatch}
        />
      </div>

      <div className={withPrefix("mb-8 mt-8")}>
        <strong>Occupancy Date</strong>

        <div className={withPrefix("flex gap-2")}>
          <Select
            value={formData.occupancy_day}
            onChange={(e) => {
              dispatch(
                updateField({ field: "occupancy_day", value: e.target.value })
              );
            }}
            invalid={showValidationError && formData.occupancy_day === ""}
          >
            <option value="">Select Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            value={formData.occupancy_month}
            onChange={(e) => {
              dispatch(
                updateField({ field: "occupancy_month", value: e.target.value })
              );
            }}
            invalid={showValidationError && formData.occupancy_month === ""}
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </Select>
          <Select
            value={formData.occupancy_year}
            onChange={(e) => {
              dispatch(
                updateField({ field: "occupancy_year", value: e.target.value })
              );
            }}
            invalid={showValidationError && formData.occupancy_year === ""}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 2025} value={i + 2025}>
                {i + 2025}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className={withPrefix("mt-4")}>
        <AllFieldsRequiredMessage show={showValidationError} id="/" />

        <NavButton
          label="Save and Continue"
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page2");
            } else {
              setShowValidationError(true);
            }
          }}
          currentPage="page1"
        />
      </div>
    </div>
  );
}

export default FormPage1;
