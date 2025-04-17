import { FormState } from "../store/formSlice";
import { validationRequirements } from "./validationRequirements";

export const validateForm = (formData: FormState) => {
  const pageValidations: any = [];
  validationRequirements.forEach((requirement, index) => {
    const allFieldsValid = requirement.fields.every((field: any) => {
      if (typeof field === "object") {
        // console.log(field, formData[field.conditional]);
        if (field.conditional && formData[field.conditional] === field.value) {
          return (
            field &&
            field.id &&
            formData &&
            formData[field.id] &&
            formData[field.id] > ""
          );
        } else if (
          field.conditional &&
          formData[field.conditional] &&
          formData[field.conditional] !== field.value &&
          field.value !== ""
        ) {
          console.log(field);
          console.log(formData[field.conditional]);
          console.log("thi sone?");
          return true;
        } else {
          return false;
        }
      } else {
        if (formData[field] && formData[field] > "") {
          return true;
        } else {
          return false;
        }
      }
    });

    pageValidations.push({ ...requirement, valid: allFieldsValid });
  });

  return pageValidations;
};
