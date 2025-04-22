import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { Input } from "./components/input";

import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useEffect, useState } from "react";
import { set } from "lodash";
import { Select } from "./components/select";
import { withPrefix } from "./utils/withPrefix";

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
        "bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-400"
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

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Customer Service Agreement</h2>

      <div>
        Please answer a few questions to better help us prepare your move in.
      </div>

      <div className={withPrefix("flex w-full")}>
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

      <p className={withPrefix("mt-4")}>
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
