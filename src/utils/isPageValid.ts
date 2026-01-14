import { useSelector } from "react-redux";
import { validateForm } from "./validateForm";
import { RootState } from "../store/store";

export const isPageValid = (key: string): boolean => {
  const formData = useSelector((state: RootState) => state.form);
  const formValidations = validateForm(formData);

  const formValidation = formValidations.find((validationRequirements: any) => {
    if (validationRequirements.id === key) {
      return validationRequirements;
    }
  });

  if (formValidation && formValidation.valid) {
    return true;
  } else {
    return false;
  }
};
