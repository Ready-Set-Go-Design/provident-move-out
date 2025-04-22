import { useNavigate } from "react-router";

import NavButton from "./components/NavButton";
import AddressSearch from "./components/AddressSearch";
import { withPrefix } from "./utils/withPrefix";

function FormPage2() {
  const navigate = useNavigate();

  return (
    <div className={withPrefix("p-4")}>
      <div></div>
      <h2>Your service address</h2>

      <div>This is the address you're moving to.</div>
      <AddressSearch />

      <p className={withPrefix("mt-4")}>
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
