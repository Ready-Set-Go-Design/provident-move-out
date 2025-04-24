import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addPageVisit } from "./store/formSlice";
import { validateForm } from "./utils/validateForm";
import { withPrefix } from "./utils/withPrefix";

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

  const currentPageNumber = getHashFromCurrentBrowserUrl().replace("page", "");
  return (
    <div
      className={withPrefix(
        "m-auto flex justify-between w-[50%] before:m-auto before:bg-gray-200 before:m-4 before:w-[50%] before:absolute before:mt-[6px] before:z-[-1] before:h-[4px] before:absolute"
      )}
    >
      {pageValidations.map((requirement: any, index: number) => {
        return (
          <div
            key={requirement.id}
            className={withPrefix("w-[15px] h-[15px]")}
            // onClick={() => {
            //   if (index + 1 < Number(currentPageNumber)) {
            //     dispatch(
            //       addPageVisit(getHashFromCurrentBrowserUrl() as string)
            //     );
            //     navigate(
            //       requirement.id === "/"
            //         ? requirement.id
            //         : `form_${requirement.id.replace("/", "")}`
            //     );
            //   }
            // }}
          >
            <div
              key={`stepper-status-${requirement.id}`}
              className={withPrefix([
                "pf:justify-center",
                index + 1 <= Number(currentPageNumber)
                  ? "w-[15px] h-[15px]"
                  : "w-[10px] h-[10px] mt-[2.5px] ml-auto",
                "rounded-xl",
                index + 1 <= Number(currentPageNumber)
                  ? "bg-green-600"
                  : "bg-gray-400",
              ])}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default FormStatus;
