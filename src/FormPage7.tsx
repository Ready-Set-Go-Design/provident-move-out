import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";
import ReactPDF from "@react-pdf/renderer";

import { withPrefix } from "./utils/withPrefix";
import PDFTemplate from "./PDFTemplate";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage7() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <div className={withPrefix("mb-4")}>
        <h1>
          Thanks for completing the Customer Service Agreement with Provident
          Energy Management Inc.
        </h1>
      </div>

      {/* <div className={withPrefix("mb-4")}>
        <Button
          onClick={async () => {
            const blob = await ReactPDF.pdf(
              <PDFTemplate formData={formData} />
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "new_customer_form.pdf";
            link.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download PDF
        </Button>
      </div> */}

      <FooterWrapper>
        <NavButton
          action={() => {
            dispatch(clearForm());
            navigate("/");
          }}
          label={"Return to Homepage"}
          currentPage=""
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage7;
