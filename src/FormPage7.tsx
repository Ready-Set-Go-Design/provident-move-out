import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "./store/formSlice";
import { clearSubmission, updateField } from "./store/submissionSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useNavigate } from "react-router";

import { withPrefix } from "./utils/withPrefix";
import { Button } from "./components/button";
import { FooterWrapper } from "./components/FooterWrapper";
import { useEffect, useRef, useState } from "react";
import { submitForm } from "./utils/submitForm";
import { requestPDF } from "./utils/requestPDF";

function FormPage7() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);
  const formData = useSelector((state: RootState) => state.form);
  const submissionData = useSelector((state: RootState) => state.submission);
  const [pdfDownloadError, setPdfDownloadError] = useState<string | null>(null);

  const { submitted, error } = submissionData;
  useEffect(() => {
    // submit form
    if (
      !submitted &&
      formData &&
      formData.customer_number !== "" &&
      !hasSubmitted.current
    ) {
      doSubmitForm();
      hasSubmitted.current = true;
    }
  }, []);

  const doSubmitForm = async () => {
    try {
      const submission = await submitForm(formData);

      if (submission.result === true) {
        dispatch(
          updateField({
            field: "submission_id",
            value: submission.submissionId,
          }),
        );
        dispatch(updateField({ field: "submitted", value: true }));
      } else {
        dispatch(updateField({ field: "error", value: true }));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateField({ field: "error", value: error as string }));
    }
  };

  if (!submitted && !error) {
    return (
      <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
        <h1 className={withPrefix("py-4 text-2xl")}>Submitting Agreement...</h1>
      </div>
    );
  }

  if (!submitted && error) {
    return (
      <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
        <h1 className={withPrefix("py-4 text-2xl")}>Submission Error</h1>
        <div className={withPrefix("mb-4")}>
          <div className={withPrefix("mt-4 mb-4")}>
            There was a problem submitting your agreement. Please ensure that
            all fields are filled out and try again.
          </div>
        </div>

        <div className={withPrefix("mt-8 flex")}>
          <div>
            <NavButton
              outline={true}
              action={() => {
                dispatch(clearForm());
                dispatch(clearSubmission());
                navigate("/");
              }}
              label={"Start Over"}
              currentPage=""
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Submission Complete</h1>
      <div className={withPrefix("mb-4")}>
        Thanks for completing the Move-out form with Provident Energy Management
        Inc.
      </div>

      <div className={withPrefix("mt-8")}>
        <Button
          onClick={async () => {
            setPdfDownloadError(null);
            try {
              // Check if we have a PDF blob from the new API response
              if (submissionData && submissionData.submission_id) {
                await requestPDF(submissionData.submission_id);
              }
            } catch (error) {
              const errorMessage =
                error instanceof Error ? error.message : String(error);
              setPdfDownloadError(errorMessage);
            }
          }}
        >
          Download PDF
        </Button>
        {pdfDownloadError && (
          <div className={withPrefix("text-(--validation-error-color)")}>
            Error downloading PDF: {pdfDownloadError}
          </div>
        )}
      </div>

      <FooterWrapper>
        <NavButton
          action={() => {
            dispatch(clearForm());
            dispatch(clearSubmission());
            navigate("/");
          }}
          label={"Start Over"}
          currentPage=""
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage7;
