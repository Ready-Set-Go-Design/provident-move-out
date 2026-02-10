import { FormState } from "../store/formSlice";
import humanizeString from "./humanizeFieldName";
import { validationRequirements } from "./validationRequirements";

export const validateForm = (formData: FormState) => {
  const humanizeFieldName = (fieldName: string) => {
    const source = [
      { replace: "selected_unit", with: "suite_or_unit_number" },
      { replace: "selected_address", with: "address" },
      { replace: "signature_image" },
    ];

    const substitution = source.find(
      (sourceItem) => sourceItem.replace === fieldName,
    );

    return humanizeString(substitution?.with ?? fieldName);
  };

  const pageValidations: any = [];
  validationRequirements.forEach((requirement) => {
    const fieldErrors: Array<string> = JSON.parse("[]");
    let allFieldsValid: boolean = true;

    requirement.fields.forEach((field: any) => {
      if (
        !formData[field.name] ||
        (formData[field.name] &&
          formData[field.name] === "" &&
          field.format === undefined)
      ) {
        let checkCondition = false;

        if (field.conditional && field.conditional.id && field.conditional.is) {
          if (formData[field.conditional.id] === field.conditional.is) {
            checkCondition = true;
          }
        }
        if (
          formData[field.name] !== field.must_be &&
          formData[field.conditional?.id] === field.conditional?.is
        ) {
          if (field.message) {
            fieldErrors.push(field.message);
          } else {
            fieldErrors.push(field.name);
          }
          allFieldsValid = false;
        }
      } else {
        if (field.format) {
          switch (field.format) {
            case "email":
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(formData[field.name] as string)) {
                if (field.message) {
                  fieldErrors.push(field.message);
                } else {
                  fieldErrors.push(field.name);
                }
                allFieldsValid = false;
              }
              break;
          }
        } else if (field.minLength) {
          if ((formData[field.name] as string).length < field.minLength) {
            if (field.message) {
              fieldErrors.push(field.message);
            } else {
              fieldErrors.push(field.name);
            }
            allFieldsValid = false;
          }
        } else if (field.must_be) {
          let checkCondition = false;

          if (field.conditional) {
            if (
              formData[field.name] !== field.must_be &&
              formData[field.conditional?.id] === field.conditional?.is
            ) {
              checkCondition = true;
            }

            if (
              checkCondition == true &&
              formData[field.name] !== field.must_be &&
              formData[field.conditional?.id] === field.conditional?.is
            ) {
              if (field.message) {
                if (field.message != " ") {
                  fieldErrors.push(field.message);
                }
              } else {
                fieldErrors.push(field.name);
              }
              allFieldsValid = false;
            }
          }
        }
      }
    });

    pageValidations.push({
      ...requirement,
      valid: allFieldsValid,
      errors: fieldErrors.map((field: string) => humanizeFieldName(field)),
    });
  });

  return pageValidations;
};
