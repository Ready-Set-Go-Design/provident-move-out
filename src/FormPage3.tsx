import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import { Input } from "./components/input";
import { withPrefix } from "./utils/withPrefix";

function FormPage3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Primary Account Holder</h2>
      <div className={withPrefix("flex gap-2 mb-4")}>
        <Input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => {
            dispatch(
              updateField({ field: "first_name", value: e.currentTarget.value })
            );
          }}
        />
        <Input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => {
            dispatch(
              updateField({ field: "last_name", value: e.currentTarget.value })
            );
          }}
        />
        <Input
          type="text"
          name="business_name"
          placeholder="Business Name"
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
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            dispatch(
              updateField({ field: "email", value: e.currentTarget.value })
            );
          }}
        />
      </div>
      <NavButton
        action={() => navigate("/form_page4")}
        label={"Save and Continue"}
        currentPage="page3"
      />
    </div>
  );
}

export default FormPage3;
