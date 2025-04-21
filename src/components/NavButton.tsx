import { useDispatch } from "react-redux";
import { addPageVisit } from "../store/formSlice";
import { Button } from "./button";

function NavButton({
  action,
  label,
  disabled,
  outline,
  currentPage,
}: {
  action: Function;
  label: string;
  disabled?: boolean;
  currentPage?: string;
  outline?: boolean;
  fullWidth?: string;
}) {
  const dispatch = useDispatch();

  return (
    <Button
      disabled={disabled}
      color="green"
      {...((outline as any) && { outline })}
      onClick={() => {
        action();

        dispatch(addPageVisit(currentPage as string));
      }}
    >
      {label}
    </Button>
  );
}

export default NavButton;
