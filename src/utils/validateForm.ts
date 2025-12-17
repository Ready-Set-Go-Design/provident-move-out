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
      (sourceItem) => sourceItem.replace === fieldName
    );

    return humanizeString(substitution?.with ?? fieldName);
  };

  const pageValidations: any = [];
  validationRequirements.forEach((requirement, index) => {
    const fieldErrors: Array<string> = JSON.parse("[]");
    let allFieldsValid: boolean = true;
    requirement.fields.forEach((field: any) => {
      if (field.conditional) {
        if (formData[field.conditional] === field.value) {
          const present =
            field &&
            field.id &&
            formData &&
            formData[field.id] &&
            (formData[field.id] as any) > "";

          let length;
          if (field && field.id && field.length) {
            length =
              field &&
              field.id &&
              field.length &&
              formData &&
              formData[field.id] &&
              (formData[field.id] as any).length === field.length;
          }
          if (field && field.id && !field.length) {
            // length field is not required
            length = true;
          }

          // check for empty string
          if (!present || !length) {
            if (field.message) {
              fieldErrors.push(field.message);
            } else {
              fieldErrors.push(field.id);
            }
            allFieldsValid = false;
          }
        } else if (
          formData[field.conditional] &&
          formData[field.conditional] !== field.value &&
          field.value !== ""
        ) {
          // allFieldsValid = true;
        } else {
          if (field.message) {
            fieldErrors.push(field.message);
          } else {
            fieldErrors.push(field.id);
          }
          allFieldsValid = false;
        }
      } else {
        if (
          !formData[field.name] ||
          (formData[field.name] &&
            formData[field.name] === "" &&
            field.format === undefined)
        ) {
          if (field.message) {
            fieldErrors.push(field.message);
          } else {
            fieldErrors.push(field.name);
          }
          allFieldsValid = false;
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
            if (formData[field.name] !== field.must_be) {
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
