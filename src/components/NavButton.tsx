import { useDispatch } from "react-redux";
import { addPageVisit } from "../store/formSlice";
import { Button } from "./button";
import { useLocation } from "react-router-dom";

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
    <div
      onClick={() => {
        if (disabled) {
          action();
        }
      }}
    >
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
    </div>
  );
}

export default NavButton;
