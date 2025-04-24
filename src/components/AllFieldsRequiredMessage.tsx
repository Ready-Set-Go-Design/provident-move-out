import { withPrefix } from "../utils/withPrefix";
import { validateForm } from "../utils/validateForm";
import { useSelector } from "react-redux";

export function AllFieldsRequiredMessage({
  show,
  id,
}: {
  show: boolean;
  id: string;
}) {
  const formData = useSelector((state: any) => state.form);
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === id
  );

  console.log("validatedForm");
  console.log(validatedForm);
  console.log(formData);
  const { errors } = validatedForm;

  if (show) {
    if (errors.length === 0) {
      return (
        <div className={withPrefix("text-sm text-green-500 mb-2")}>
          You're good to go!
        </div>
      );
    } else {
      return (
        <div className={withPrefix("text-sm text-red-500 mb-2")}>
          Please correctly fill the following fields:
          <br />
          <span className={withPrefix("font-bold")}>{errors.join(", ")}</span>
        </div>
      );
    }
  }
}
