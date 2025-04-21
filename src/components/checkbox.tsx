import * as Headless from "@headlessui/react";
import clsx from "clsx";
import type React from "react";

export function CheckboxGroup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={clsx(
        className,
        // Basic groups
        "pf:space-y-3",
        // With descriptions
        "pf:has-data-[slot=description]:space-y-6 pf:has-data-[slot=description]:**:data-[slot=label]:font-medium"
      )}
    />
  );
}

export function CheckboxField({
  className,
  ...props
}: { className?: string } & Omit<Headless.FieldProps, "as" | "className">) {
  return (
    <Headless.Field
      data-slot="field"
      {...props}
      className={clsx(
        className,
        // Base layout
        "pf:grid pf:grid-cols-[1.125rem_1fr] pf:items-center pf:gap-x-4 pf:gap-y-1 pf:sm:grid-cols-[1rem_1fr]",
        // Control layout
        "pf:*:data-[slot=control]:col-start-1 pf:*:data-[slot=control]:row-start-1 pf:*:data-[slot=control]:justify-self-center",
        // Label layout
        "pf:*:data-[slot=label]:col-start-2 pf:*:data-[slot=label]:row-start-1 pf:*:data-[slot=label]:justify-self-start",
        // Description layout
        "pf:*:data-[slot=description]:col-start-2 pf:*:data-[slot=description]:row-start-2",
        // With description
        "pf:has-data-[slot=description]:**:data-[slot=label]:font-medium"
      )}
    />
  );
}

const base = [
  // Basic layout
  "pf:relative pf:isolate pf:flex pf:size-[1.125rem] pf:items-center pf:justify-center pf:rounded-[0.3125rem] pf:sm:size-4",
  // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
  "pf:before:absolute pf:before:inset-0 before:-z-10 pf:before:rounded-[calc(0.3125rem-1px)] pf:before:bg-white pf:before:shadow-sm",
  // Background color when checked
  "pf:group-data-checked:before:bg-(--checkbox-checked-bg)",
  // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  "pf:dark:before:hidden",
  // Background color applied to control in dark mode
  "pf:dark:bg-white/5 pf:dark:group-data-checked:bg-(--checkbox-checked-bg)",
  // Border
  "pf:border pf:border-zinc-950/15 pf:group-data-checked:border-transparent pf:group-data-hover:group-data-checked:border-transparent pf:group-data-hover:border-zinc-950/30 pf:group-data-checked:bg-(--checkbox-checked-border)",
  "pf:dark:border-white/15 pf:dark:group-data-checked:border-white/5 pf:dark:group-data-hover:group-data-checked:border-white/5 pf:dark:group-data-hover:border-white/30",
  // Inner highlight shadow
  "pf:after:absolute pf:after:inset-0 pf:after:rounded-[calc(0.3125rem-1px)] pf:after:shadow-[inset_0_1px_--theme(--color-white/15%)]",
  "pf:dark:after:-inset-px pf:dark:after:hidden pf:dark:after:rounded-[0.3125rem] pf:dark:group-data-checked:after:block",
  // Focus ring
  "pf:group-data-focus:outline pf:group-data-focus:outline-2 pf:group-data-focus:outline-offset-2 pf:group-data-focus:outline-blue-500",
  // Disabled state
  "pf:group-data-disabled:opacity-50",
  "pf:group-data-disabled:border-zinc-950/25 pf:group-data-disabled:bg-zinc-950/5 pf:group-data-disabled:[--checkbox-check:var(--color-zinc-950)]/50 pf:group-data-disabled:before:bg-transparent",
  "pf:dark:group-data-disabled:border-white/20 pf:dark:group-data-disabled:bg-white/[2.5%] pf:dark:group-data-disabled:[--checkbox-check:var(--color-white)]/50 pf:dark:group-data-checked:group-data-disabled:after:hidden",
  // Forced colors mode
  "pf:forced-colors:[--checkbox-check:HighlightText] pf:forced-colors:[--checkbox-checked-bg:Highlight] pf:forced-colors:group-data-disabled:[--checkbox-check:Highlight]",
  "pf:dark:forced-colors:[--checkbox-check:HighlightText] pf:dark:forced-colors:[--checkbox-checked-bg:Highlight] pf:dark:forced-colors:group-data-disabled:[--checkbox-check:Highlight]",
];

const colors = {
  "dark/zinc": [
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-zinc-900)] pf:[--checkbox-checked-border:var(--color-zinc-950)]/90",
    "pf:dark:[--checkbox-checked-bg:var(--color-zinc-600)]",
  ],
  "dark/white": [
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-zinc-900)] pf:[--checkbox-checked-border:var(--color-zinc-950)]/90",
    "pf:dark:[--checkbox-check:var(--color-zinc-900)] pf:dark:[--checkbox-checked-bg:var(--color-white)] pf:dark:[--checkbox-checked-border:var(--color-zinc-950)]/15",
  ],
  white:
    "pf:[--checkbox-check:var(--color-zinc-900)] pf:[--checkbox-checked-bg:var(--color-white)] pf:[--checkbox-checked-border:var(--color-zinc-950)]/15",
  dark: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-zinc-900)] pf:[--checkbox-checked-border:var(--color-zinc-950)]/90",
  zinc: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-zinc-600)] pf:[--checkbox-checked-border:var(--color-zinc-700)]/90",
  red: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-red-600)] pf:[--checkbox-checked-border:var(--color-red-700)]/90",
  orange:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-orange-500)] pf:[--checkbox-checked-border:var(--color-orange-600)]/90",
  amber:
    "pf:[--checkbox-check:var(--color-amber-950)] pf:[--checkbox-checked-bg:var(--color-amber-400)] pf:[--checkbox-checked-border:var(--color-amber-500)]/80",
  yellow:
    "pf:[--checkbox-check:var(--color-yellow-950)] pf:[--checkbox-checked-bg:var(--color-yellow-300)] pf:[--checkbox-checked-border:var(--color-yellow-400)]/80",
  lime: "pf:[--checkbox-check:var(--color-lime-950)] pf:[--checkbox-checked-bg:var(--color-lime-300)] pf:[--checkbox-checked-border:var(--color-lime-400)]/80",
  green:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-green-600)] pf:[--checkbox-checked-border:var(--color-green-700)]/90",
  emerald:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-emerald-600)] pf:[--checkbox-checked-border:var(--color-emerald-700)]/90",
  teal: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-teal-600)] pf:[--checkbox-checked-border:var(--color-teal-700)]/90",
  cyan: "pf:[--checkbox-check:var(--color-cyan-950)] pf:[--checkbox-checked-bg:var(--color-cyan-300)] pf:[--checkbox-checked-border:var(--color-cyan-400)]/80",
  sky: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-sky-500)] pf:[--checkbox-checked-border:var(--color-sky-600)]/80",
  blue: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-blue-600)] pf:[--checkbox-checked-border:var(--color-blue-700)]/90",
  indigo:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-indigo-500)] pf:[--checkbox-checked-border:var(--color-indigo-600)]/90",
  violet:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-violet-500)] pf:[--checkbox-checked-border:var(--color-violet-600)]/90",
  purple:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-purple-500)] pf:[--checkbox-checked-border:var(--color-purple-600)]/90",
  fuchsia:
    "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-fuchsia-500)] pf:[--checkbox-checked-border:var(--color-fuchsia-600)]/90",
  pink: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-pink-500)] pf:[--checkbox-checked-border:var(--color-pink-600)]/90",
  rose: "pf:[--checkbox-check:var(--color-white)] pf:[--checkbox-checked-bg:var(--color-rose-500)] pf:[--checkbox-checked-border:var(--color-rose-600)]/90",
};

type Color = keyof typeof colors;

export function Checkbox({
  color = "dark/zinc",
  className,
  ...props
}: {
  color?: Color;
  className?: string;
} & Omit<Headless.CheckboxProps, "as" | "className">) {
  return (
    <Headless.Checkbox
      data-slot="control"
      {...props}
      className={clsx(
        className,
        "pf:group pf:inline-flex focus:outline-hidden"
      )}
    >
      <span className={clsx([base, colors[color]])}>
        <svg
          className="pf:size-4 pf:stroke-(--checkbox-check) pf:opacity-0 pf:group-data-checked:opacity-100 pf:sm:h-3.5 pf:sm:w-3.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="pf:opacity-100 pf:group-data-indeterminate:opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="pf:opacity-0 pf:group-data-indeterminate::opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Headless.Checkbox>
  );
}
