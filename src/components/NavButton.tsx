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
            ? "border-gray-300"
            : "bg-gray-300 text-black"
          : mode === "outline"
          ? "border-main-button border-2"
          : "bg-main-button text-white"
      }  py-2 px-4 rounded ${fullWidth !== "false" ? "w-full" : ""}`}
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
