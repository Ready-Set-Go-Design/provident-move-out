import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addPageVisit } from "./store/formSlice";
import { validateForm } from "./utils/validateForm";

interface FormStatusProps {
  currentFormPage: string;
}

function FormStatus({ currentFormPage }: FormStatusProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const pageValidations = validateForm(formData);
  const getHashFromCurrentBrowserUrl = () => {
    const url = window.location.href;
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      let str = url
        .substring(hashIndex + 1)
        .replace("#", "")
        .replace("/", "")
        .replace("form_", "");
      if (str.indexOf("page") === -1) {
        str = "page1";
      }
      return str;
    } else {
      return "";
    }
  };

  return (
    <div className="pf:m-4 pf:flex">
      {pageValidations.map((requirement: any, index: number) => {
        return (
          <span
            key={requirement.id}
            className={`cursor-pointer pf:p-2 rounded-[30px] pf:mr-4 ${
              currentFormPage ===
              (requirement.id === "/"
                ? requirement.id
                : `/form_${requirement.id.replace("/", "")}`)
                ? "pf:bg-gray-200"
                : ""
            }`}
            onClick={() => {
              dispatch(addPageVisit(getHashFromCurrentBrowserUrl() as string));
              navigate(
                requirement.id === "/"
                  ? requirement.id
                  : `form_${requirement.id.replace("/", "")}`
              );
            }}
          >
            <span
              key={`stepper-status-${requirement.id}`}
              className="pf:text-gray-600"
            >
              {requirement.valid &&
                (formData.pageVisited ?? []).includes(`page${index + 1}`) && (
                  <span className="pf:text-green-600">✓</span>
                )}
              {!requirement.valid &&
                (formData.pageVisited ?? []).includes(`page${index + 1}`) && (
                  <span className="pf:text-red-600">✗</span>
                )}
              {!(formData.pageVisited ?? []).includes(`page${index + 1}`) && (
                <span className="pf:text-gray-400">•</span>
              )}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default FormStatus;
