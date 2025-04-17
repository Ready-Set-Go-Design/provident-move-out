import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="p-4">
      <div></div>
      <h2>Primary Account Holder</h2>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        className="p-2 border border-gray-300 rounded"
        value={formData.first_name}
        onChange={(e) => {
          dispatch(
            updateField({ field: "first_name", value: e.currentTarget.value })
          );
        }}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        className="p-2 border border-gray-300 rounded"
        value={formData.last_name}
        onChange={(e) => {
          dispatch(
            updateField({ field: "last_name", value: e.currentTarget.value })
          );
        }}
      />
      <input
        type="text"
        name="business_name"
        placeholder="Business Name"
        className="p-2 border border-gray-300 rounded"
        value={formData.business_name}
        onChange={(e) => {
          dispatch(
            updateField({
              field: "business_name",
              value: e.currentTarget.value,
            })
          );
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded"
        value={formData.email}
        onChange={(e) => {
          dispatch(
            updateField({ field: "email", value: e.currentTarget.value })
          );
        }}
      />

      <NavButton
        action={() => navigate("/form_page4")}
        label={"Save and Continue"}
        currentPage="page3"
      />
    </div>
  );
}

export default FormPage3;
