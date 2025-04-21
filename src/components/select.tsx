import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";

export const Select = forwardRef(function Select(
  {
    className,
    multiple,
    ...props
  }: { className?: string } & Omit<Headless.SelectProps, "as" | "className">,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        "pf:group pf:relative pf:block pf:w-full",
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        "pf:before:absolute pf:before:inset-px pf:before:rounded-[calc(var(--radius-lg)-1px)] pf:before:bg-white pf:before:shadow-sm",
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        "pf:dark:before:hidden",
        // Focus ring
        "pf:after:pointer-events-none pf:after:absolute pf:after:inset-0 pf:after:rounded-lg pf:after:ring-transparent pf:after:ring-inset pf:has-data-focus:after:ring-2 pf:has-data-focus:after:ring-blue-500",
        // Disabled state
        "pf:has-data-disabled:opacity-50 pf:has-data-disabled:before:bg-zinc-950/5 pf:has-data-disabled:before:shadow-none",
      ])}
    >
      <Headless.Select
        ref={ref}
        multiple={multiple}
        {...props}
        className={clsx([
          // Basic layout
          "pf:relative pf:block pf:w-full pf:appearance-none pf:rounded-lg pf:py-[calc(--spacing(2.5)-1px)] pf:sm:py-[calc(--spacing(1.5)-1px)]",
          // Horizontal padding
          multiple
            ? "pf:px-[calc(--spacing(3.5)-1px)] pf:sm:px-[calc(--spacing(3)-1px)]"
            : "pf:pr-[calc(--spacing(10)-1px)] pf:pl-[calc(--spacing(3.5)-1px)] pf:sm:pr-[calc(--spacing(9)-1px)] pf:sm:pl-[calc(--spacing(3)-1px)]",
          // Options (multi-select)
          "[&_optgroup]:font-semibold",
          // Typography
          "pf:text-base/6 pf:text-zinc-950 pf:placeholder:text-zinc-500 pf:sm:text-sm/6 pf:dark:text-white pf:dark:*:text-white",
          // Border
          "pf:border pf:border-zinc-950/10 pf:data-hover:border-zinc-950/20 pf:dark:border-white/10 pf:dark:data-hover:border-white/20",
          // Background color
          "pf:bg-transparent pf:dark:bg-white/5 pf:dark:*:bg-zinc-800",
          // Hide default focus styles
          "pf:focus:outline-hidden",
          // Invalid state
          "pf:data-invalid:border-red-500 pf:data-invalid:data-hover:border-red-500 pf:dark:data-invalid:border-red-600 pf:dark:data-invalid:data-hover:border-red-600",
          // Disabled state
          "pf:data-disabled:border-zinc-950/20 pf:data-disabled:opacity-100 pf:dark:data-disabled:border-white/15 pf:dark:data-disabled:bg-white/[2.5%] pf:dark:data-hover:data-disabled:border-white/15",
        ])}
      />
      {!multiple && (
        <span className="pf:pointer-events-none pf:absolute pf:inset-y-0 pf:right-0 pf:flex pf:items-center pf:pr-2">
          <svg
            className="pf:size-5 pf:stroke-zinc-500 pf:group-has-data-disabled:stroke-zinc-600 pf:sm:size-4 pf:dark:stroke-zinc-400 pf:forced-colors:stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M5.75 10.75L8 13L10.25 10.75"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.25 5.25L8 3L5.75 5.25"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </span>
  );
});
