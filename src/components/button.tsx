import * as Headless from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { Link } from "./link";

const styles = {
  base: [
    // Base
    "pf:relative pf:isolate pf:inline-flex pf:items-baseline pf:justify-center pf:gap-x-2 pf:rounded-lg pf:border pf:text-base/6 pf:font-semibold",
    // Sizing
    "pf:px-[calc(--spacing(3.5)-1px)] pf:py-[calc(--spacing(2.5)-1px)] pf:sm:px-[calc(--spacing(3)-1px)] pf:sm:py-[calc(--spacing(1.5)-1px)] pf:sm:text-sm/6",
    // pf:focus
    "pf:focus:outline-hidden pf:data-focus:outline pf:data-focus:outline-2 pf:data-focus:outline-offset-2 pf:data-focus:outline-blue-500",
    // Disabled
    "pf:data-disabled:opacity-50",
    // Icon
    "pf:*:pf:data-[slot=icon]:-mx-0.5 pf:*:pf:data-[slot=icon]:my-0.5 pf:*:pf:data-[slot=icon]:size-5 pf:*:pf:data-[slot=icon]:shrink-0 pf:*:pf:data-[slot=icon]:self-center pf:*:pf:data-[slot=icon]:text-(--btn-icon) pf:sm:*:data-[slot=icon]:my-1 pf:sm:*:data-[slot=icon]:size-4 pf:forced-colors:[--btn-icon:ButtonText] forced-colors:pf:data-hover:[--btn-icon:ButtonText]",
  ],
  solid: [
    // Optical pf:border, implemented as the button background to avoid corner artifacts
    "pf:border-transparent pf:bg-(--btn-border)",
    // Dark mode: pf:border is rendered on `after` so background is set to button background
    "pf:dark:bg-(--btn-bg)",
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    "pf:before:absolute pf:before:inset-0 pf:before:-z-10 pf:before:rounded-[calc(var(--radius-lg)-1px)] pf:before:bg-(--btn-bg)",
    // Drop pf:shadow, applied to the inset `before` layer so it blends with the pf:border
    "pf:before:shadow-sm",
    // Background color is moved to control and pf:shadow is removed in dark mode so hide `before` pseudo
    "pf:dark:before:hidden",
    // Dark mode: Subtle white outline is applied using a pf:border
    "pf:dark:border-white/5",
    // Shim/overlay, inset to match button foreground and used for hover state + highlight pf:shadow
    "pf:after:absolute pf:after:inset-0 pf:after:-z-10 pf:after:rounded-[calc(var(--radius-lg)-1px)]",
    // Inner highlight pf:shadow
    "pf:after:shadow-[shadow:inset_0_1px_--theme(--pf-color-white/15%)]",
    // White overlay on hover
    "pf:data-active:after:bg-(--btn-hover-overlay) pf:data-hover:after:bg-(--btn-hover-overlay)",
    // Dark mode: `after` layer expands to cover entire button
    "pf:dark:after:-inset-px pf:dark:after:rounded-lg",
    // Disabled
    "pf:data-disabled:before:shadow-none pf:data-disabled:after:shadow-none",
  ],
  outline: [
    // Base
    "pf:border-zinc-950/10 pf:text-zinc-950 pf:data-active:bg-zinc-950/[2.5%] pf:data-hover:bg-zinc-950/[2.5%]",
    // Dark mode
    "dark:border-white/15 dark:text-white pf:dark:[--btn-bg:transparent] dark:pf:data-active:bg-white/5 dark:pf:data-hover:bg-white/5",
    // Icon
    "pf:[--btn-icon:var(--pf-color-zinc-500)] pf:data-active:[--btn-icon:var(--pf-color-zinc-700)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-700)] dark:pf:data-active:[--btn-icon:var(--pf-color-zinc-400)] dark:pf:data-hover:[--btn-icon:var(--pf-color-zinc-400)]",
  ],
  plain: [
    // Base
    "pf:border-transparent pf:text-zinc-950 pf:data-active:bg-zinc-950/5 pf:data-hover:bg-zinc-950/5",
    // Dark mode
    "dark:text-white pf:data-active:bg-white/10 pf:data-hover:bg-white/10",
    // Icon
    "pf:[--btn-icon:var(--pf-color-zinc-500)] pf:data-active:[--btn-icon:var(--pf-color-zinc-700)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-700)] pf:dark:[--btn-icon:var(--pf-color-zinc-500)] dark:pf:data-active:[--btn-icon:var(--pf-color-zinc-400)] dark:pf:data-hover:[--btn-icon:var(--pf-color-zinc-400)]",
  ],
  colors: {
    "dark/zinc": [
      "pf:text-white pf:[--btn-bg:var(--pf-color-zinc-900)] pf:[--btn-border:var(--pf-color-zinc-950)]/90 pf:[--btn-hover-overlay:var(--pf-color-white)]/10",
      "pf:dark:text-white pf:dark:[--btn-bg:var(--pf-color-zinc-600)] pf:dark:[--btn-hover-overlay:var(--pf-color-white)]/5",
      "pf:[--btn-icon:var(--pf-color-zinc-400)] pf:data-active:[--btn-icon:var(--pf-color-zinc-300)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-300)]",
    ],
    light: [
      "pf:text-zinc-950 pf:[--btn-bg:white] pf:[--btn-border:var(--pf-color-zinc-950)]/10 pf:[--btn-hover-overlay:var(--pf-color-zinc-950)]/[2.5%] pf:data-active:[--btn-border:var(--pf-color-zinc-950)]/15 pf:data-hover:[--btn-border:var(--pf-color-zinc-950)]/15",
      "dark:text-white pf:dark:[--btn-hover-overlay:var(--pf-color-white)]/5 pf:dark:[--btn-bg:var(--pf-color-zinc-800)]",
      "pf:[--btn-icon:var(--pf-color-zinc-500)] pf:data-active:[--btn-icon:var(--pf-color-zinc-700)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-700)] pf:dark:[--btn-icon:var(--pf-color-zinc-500)] dark:pf:data-active:[--btn-icon:var(--pf-color-zinc-400)] dark:pf:data-hover:[--btn-icon:var(--pf-color-zinc-400)]",
    ],
    "dark/white": [
      "pf:text-white pf:[--btn-bg:var(--pf-color-zinc-900)] pf:[--btn-border:var(--pf-color-zinc-950)]/90 pf:[--btn-hover-overlay:var(--pf-color-white)]/10",
      "dark:text-zinc-950 pf:dark:[--btn-bg:white] pf:dark:[--btn-hover-overlay:var(--pf-color-zinc-950)]/5",
      "pf:[--btn-icon:var(--pf-color-zinc-400)] pf:data-active:[--btn-icon:var(--pf-color-zinc-300)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-300)] pf:dark:[--btn-icon:var(--pf-color-zinc-500)] dark:pf:data-active:[--btn-icon:var(--pf-color-zinc-400)] dark:pf:data-hover:[--btn-icon:var(--pf-color-zinc-400)]",
    ],
    dark: [
      "pf:text-white pf:[--btn-bg:var(--pf-color-zinc-900)] pf:[--btn-border:var(--pf-color-zinc-950)]/90 pf:[--btn-hover-overlay:var(--pf-color-white)]/10",
      "pf:dark:[--btn-hover-overlay:var(--pf-color-white)]/5 pf:dark:[--btn-bg:var(--pf-color-zinc-800)]",
      "pf:[--btn-icon:var(--pf-color-zinc-400)] pf:data-active:[--btn-icon:var(--pf-color-zinc-300)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-300)]",
    ],
    white: [
      "pf:text-zinc-950 pf:[--btn-bg:white] pf:[--btn-border:var(--pf-color-zinc-950)]/10 pf:[--btn-hover-overlay:var(--pf-color-zinc-950)]/[2.5%] pf:data-active:[--btn-border:var(--pf-color-zinc-950)]/15 pf:data-hover:[--btn-border:var(--pf-color-zinc-950)]/15",
      "pf:dark:[--btn-hover-overlay:var(--pf-color-zinc-950)]/5",
      "pf:[--btn-icon:var(--pf-color-zinc-400)] pf:data-active:[--btn-icon:var(--pf-color-zinc-500)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-500)]",
    ],
    zinc: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-zinc-600)] pf:[--btn-border:var(--pf-color-zinc-700)]/90",
      "pf:dark:[--btn-hover-overlay:var(--pf-color-white)]/5",
      "pf:[--btn-icon:var(--pf-color-zinc-400)] pf:data-active:[--btn-icon:var(--pf-color-zinc-300)] pf:data-hover:[--btn-icon:var(--pf-color-zinc-300)]",
    ],
    indigo: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-indigo-500)] pf:[--btn-border:var(--pf-color-indigo-600)]/90",
      "pf:[--btn-icon:var(--pf-color-indigo-300)]pf: pf:data-active:[--btn-icon:var(--pf-color-indigo-200)] pf:data-hover:[--btn-icon:var(--pf-color-indigo-200)]",
    ],
    cyan: [
      "pf:text-cyan-950 pf:[--btn-bg:var(--pf-color-cyan-300)] pf:[--btn-border:var(--pf-color-cyan-400)]/80 pf:[--btn-hover-overlay:var(--pf-color-white)]/25",
      "pf:[--btn-icon:var(--pf-color-cyan-500)]",
    ],
    red: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-red-600)] pf:[--btn-border:var(--pf-color-red-700)]/90",
      "pf:[--btn-icon:var(--pf-color-red-300)] pf:data-active:[--btn-icon:var(--pf-color-red-200)] pf:data-hover:[--btn-icon:var(--pf-color-red-200)]",
    ],
    orange: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-orange-500)] pf:[--btn-border:var(--pf-color-orange-600)]/90",
      "pf:[--btn-icon:var(--pf-color-orange-300)] pf:data-active:[--btn-icon:var(--pf-color-orange-200)] pf:data-hover:[--btn-icon:var(--pf-color-orange-200)]",
    ],
    amber: [
      "pf:text-amber-950 pf:[--btn-hover-overlay:var(--pf-color-white)]/25 pf:[--btn-bg:var(--pf-color-amber-400)] pf:[--btn-border:var(--pf-color-amber-500)]/80",
      "pf:[--btn-icon:var(--pf-color-amber-600)]",
    ],
    yellow: [
      "pf:text-yellow-950 pf:[--btn-hover-overlay:var(--pf-color-white)]/25 pf:[--btn-bg:var(--pf-color-yellow-300)] pf:[--btn-border:var(--pf-color-yellow-400)]/80",
      "pf:[--btn-icon:var(--pf-color-yellow-600)] pf:data-active:[--btn-icon:var(--pf-color-yellow-700)] pf:data-hover:[--btn-icon:var(--pf-color-yellow-700)]",
    ],
    lime: [
      "pf:text-lime-950 pf:[--btn-hover-overlay:var(--pf-color-white)]/25 pf:[--btn-bg:var(--pf-color-lime-300)] pf:[--btn-border:var(--pf-color-lime-400)]/80",
      "pf:[--btn-icon:var(--pf-color-lime-600)] pf:data-active:[--btn-icon:var(--pf-color-lime-700)] pf:data-hover:[--btn-icon:var(--pf-color-lime-700)]",
    ],
    green: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-green-600)] pf:[--btn-border:var(--pf-color-green-700)]/90",
      "pf:[--btn-icon:var(--pf-color-white)]/60 pf:data-active:[--btn-icon:var(--pf-color-white)]/80 pf:data-hover:[--btn-icon:var(--pf-color-white)]/80",
    ],
    emerald: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-emerald-600)] pf:[--btn-border:var(--pf-color-emerald-700)]/90",
      "pf:[--btn-icon:var(--pf-color-white)]/60 pf:data-active:[--btn-icon:var(--pf-color-white)]/80 pf:data-hover:[--btn-icon:var(--pf-color-white)]/80",
    ],
    teal: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-teal-600)] pf:[--btn-border:var(--pf-color-teal-700)]/90",
      "pf:[--btn-icon:var(--pf-color-white)]/60 pf:data-active:[--btn-icon:var(--pf-color-white)]/80 pf:data-hover:[--btn-icon:var(--pf-color-white)]/80",
    ],
    sky: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-sky-500)] pf:[--btn-border:var(--pf-color-sky-600)]/80",
      "pf:[--btn-icon:var(--pf-color-white)]/60 pf:data-active:[--btn-icon:var(--pf-color-white)]/80 pf:data-hover:[--btn-icon:var(--pf-color-white)]/80",
    ],
    blue: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-blue-600)] pf:[--btn-border:var(--pf-color-blue-700)]/90",
      "pf:[--btn-icon:var(--pf-color-blue-400)] pf:data-active:[--btn-icon:var(--pf-color-blue-300)] pf:data-hover:[--btn-icon:var(--pf-color-blue-300)]",
    ],
    violet: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-violet-500)] pf:[--btn-border:var(--pf-color-violet-600)]/90",
      "pf:[--btn-icon:var(--pf-color-violet-300)] pf:data-active:[--btn-icon:var(--pf-color-violet-200)] pf:data-hover:[--btn-icon:var(--pf-color-violet-200)]",
    ],
    purple: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-purple-500)] pf:[--btn-border:var(--pf-color-purple-600)]/90",
      "pf:[--btn-icon:var(--pf-color-purple-300)] pf:data-active:[--btn-icon:var(--pf-color-purple-200)] pf:data-hover:[--btn-icon:var(--pf-color-purple-200)]",
    ],
    fuchsia: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-fuchsia-500)] pf:[--btn-border:var(--pf-color-fuchsia-600)]/90",
      "pf:[--btn-icon:var(--pf-color-fuchsia-300)] pf:data-active:[--btn-icon:var(--pf-color-fuchsia-200)] pf:data-hover:[--btn-icon:var(--pf-color-fuchsia-200)]",
    ],
    pink: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-pink-500)] pf:[--btn-border:var(--pf-color-pink-600)]/90",
      "pf:[--btn-icon:var(--pf-color-pink-300)] pf:data-active:[--btn-icon:var(--pf-color-pink-200)] pf:data-hover:[--btn-icon:var(--pf-color-pink-200)]",
    ],
    rose: [
      "pf:text-white pf:[--btn-hover-overlay:var(--pf-color-white)]/10 pf:[--btn-bg:var(--pf-color-rose-500)] pf:[--btn-border:var(--pf-color-rose-600)]/90",
      "pf:[--btn-icon:var(--pf-color-rose-300)] pf:data-active:[--btn-icon:var(--pf-color-rose-200)] pf:data-hover:[--btn-icon:var(--pf-color-rose-200)]",
    ],
  },
};

type ButtonProps = (
  | { color?: keyof typeof styles.colors; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & { className?: string; children: React.ReactNode } & (
    | Omit<Headless.ButtonProps, "as" | "className">
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">
  );

export const Button = forwardRef(function Button(
  { color, outline, plain, className, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  let classes = clsx(
    className,
    styles.base,
    outline
      ? styles.outline
      : plain
      ? styles.plain
      : clsx(styles.solid, styles.colors[color ?? "dark/zinc"])
  );
  console.log("stuff");

  console.log(classes);
  return "href" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <Headless.Button
      {...props}
      className={clsx(classes, "pf:cursor-default")}
      ref={ref}
    >
      <TouchTarget>{children}</TouchTarget>
    </Headless.Button>
  );
});

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="pf:absolute pf:top-1/2 pf:left-1/2 pf:size-[max(100%,2.75rem)] pf:-translate-x-1/2 pf:-translate-y-1/2 pf:[@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
