import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateField, addPageVisit } from "./store/formSlice";
import { RootState } from "./store/store";

import NavButton from "./components/NavButton";
import AddressSearch from "./components/AddressSearch";

function FormPage2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className="p-4">
      <div></div>
      <h2>Your service address</h2>

      <div>This is the address you're moving to.</div>
      <AddressSearch />

      <p className="mt-4">
        <NavButton
          label="Save and Continue"
          action={() => navigate("/form_page3")}
          currentPage="page2"
        />
      </p>
    </div>
  );
}

export default FormPage2;
