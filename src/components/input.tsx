import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";

export function InputGroup({
  children,
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="control"
      className={clsx(
        "pf:relative pf:isolate pf:block",
        "pf:has-[[data-slot=icon]:first-child]:[&_input]:pl-10 pf:has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8",
        "pf:*:data-[slot=icon]:pointer-events-none pf:*:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4",
        "pf:[&>[data-slot=icon]:first-child]:left-3 pf:sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5",
        "pf:*:data-[slot=icon]:text-zinc-500 pf:dark:*:data-[slot=icon]:text-zinc-400"
      )}
    >
      {children}
    </span>
  );
}

const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];

export const Input = forwardRef(function Input(
  {
    className,
    ...props
  }: {
    className?: string;
    type?:
      | "email"
      | "number"
      | "password"
      | "search"
      | "tel"
      | "text"
      | "url"
      | DateType;
  } & Omit<Headless.InputProps, "as" | "className">,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <span
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        "pf:relative pf:block pf:w-full",
        // Background color + pf:shadow applied to inset pseudo element, so pf:shadow blends with pf:border in light mode
        "pf:before:absolute pf:before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] pf:before:bg-white pf:before:shadow-sm",
        // Background color is moved to control and pf:shadow is removed in dark mode so hide `before` pseudo
        "pf:dark:before:hidden",
        // Focus pf:ring
        "pf:after:pointer-events-none pf:after:absolute pf:after:inset-0 pf:after:rounded-lg pf:after:ring-transparent pf:after:ring-inset pf:sm:focus-within:after:ring-2 pf:sm:focus-within:after:ring-blue-500",
        // Disabled state
        "pf:has-data-disabled:opacity-50 pf:has-data-disabled:before:bg-zinc-950/5 pf:has-data-disabled:before:shadow-none",
        // Invalid state
        "pf:has-data-invalid:before:shadow-red-500/10",
      ])}
    >
      <Headless.Input
        ref={ref}
        {...props}
        className={clsx([
          // Date classes
          props.type &&
            dateTypes.includes(props.type) && [
              "pf:[&::-webkit-datetime-edit-fields-wrapper]:p-0",
              "pf:[&::-webkit-date-and-time-value]:min-h-[1.5em]",
              "pf:[&::-webkit-datetime-edit]:inline-flex",
              "pf:[&::-webkit-datetime-edit]:p-0",
              "pf:[&::-webkit-datetime-edit-year-field]:p-0",
              "pf:[&::-webkit-datetime-edit-month-field]:p-0",
              "pf:[&::-webkit-datetime-edit-day-field]:p-0",
              "pf:[&::-webkit-datetime-edit-hour-field]:p-0",
              "pf:[&::-webkit-datetime-edit-minute-field]:p-0",
              "pf:[&::-webkit-datetime-edit-second-field]:p-0",
              "pf:[&::-webkit-datetime-edit-millisecond-field]:p-0",
              "pf:[&::-webkit-datetime-edit-meridiem-field]:p-0",
            ],
          // Basic layout
          "pf:relative pf:block pf:w-full pf:appearance-none pf:rounded-lg pf:px-[calc(--spacing(3.5)-1px)] pf:py-[calc(--spacing(2.5)-1px)] pf:sm:px-[calc(--spacing(3)-1px)] pf:sm:py-[calc(--spacing(1.5)-1px)]",
          // Typography
          "pf:text-base/6 pf:text-zinc-950 pf:placeholder:text-zinc-500 pf:sm:text-sm/6 pf:dark:text-white",
          // Border
          "pf:border pf:border-zinc-950/10 pf:data-hover:border-zinc-950/20 pf:dark:border-white/10 pf:dark:data-hover:border-white/20",
          // Background color
          "pf:bg-transparent pf:dark:bg-white/5",
          // Hide default focus styles
          "pf:focus:outline-hidden",
          // Invalid state
          "pf:data-invalid:border-red-500 pf:data-invalid:data-hover:border-red-500 pf:dark:data-invalid:border-red-500 pf:dark:data-invalid:data-hover:border-red-500",
          // Disabled state
          "pf:data-disabled:border-zinc-950/20 pf:dark:data-disabled:border-white/15 pf:dark:data-disabled:bg-white/[2.5%] pf:dark:data-hover:data-disabled:border-white/15",
          // System icons
          "pf:dark:[color-scheme:dark]",
        ])}
      />
    </span>
  );
});
