import { useDispatch } from "react-redux";
import { addPageVisit } from "../store/formSlice";

function NavButton({
  action,
  label,
  disabled,
  currentPage,
  mode,
  fullWidth,
}: {
  action: Function;
  label: string;
  disabled?: boolean;
  currentPage?: string;
  mode?: "regular" | "outline";
  fullWidth?: string;
}) {
  const dispatch = useDispatch();

  return (
    <button
      className={`${
        disabled
          ? mode === "outline"
            ? "pf:border-gray-300"
            : "pf:bg-gray-300 pf:text-black"
          : mode === "outline"
          ? "pf:border-main-button pf:border-2"
          : "pf:bg-main-button pf:text-white"
      }  pf:py-2 pf:px-4 pf:rounded ${
        fullWidth !== "false" ? "pf:w-full" : ""
      }`}
      onClick={() => {
        action();

        dispatch(addPageVisit(currentPage as string));
      }}
    >
      {label}
    </button>
  );
}

export default NavButton;
