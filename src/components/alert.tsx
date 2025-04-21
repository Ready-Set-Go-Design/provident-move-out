import * as Headless from "@headlessui/react";
import clsx from "clsx";
import type React from "react";
import { Text } from "./text";

const sizes = {
  xs: "pf:sm:max-w-xs",
  sm: "pf:sm:max-w-sm",
  md: "pf:max-w-md",
  lg: "pf:max-w-lg",
  xl: "pf:max-w-xl",
  "2xl": "pf:max-w-2xl",
  "3xl": "pf:max-w-3xl",
  "4xl": "pf:max-w-4xl",
  "5xl": "pf:max-w-5xl",
};

export function Alert({
  size = "md",
  className,
  children,
  ...props
}: {
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
} & Omit<Headless.DialogProps, "as" | "className">) {
  return (
    <Headless.Dialog {...props}>
      <Headless.DialogBackdrop
        transition
        className="pf:fixed pf:inset-0 pf:flex pf:w-screen pf:justify-center pf:overflow-y-auto bg-zinc-950/15 pf:px-2 pf:py-2 pf:transition pf:duration-100 pf:focus:outline-0 pf:data-closed:pf:opacity-0 pf:data-enter:pf:ease-out pf:data-leave:pf:ease-in pf:sm:px-6 pf:sm:py-8 pf:lg:px-8 pf:lg:py-16 pf:dark:bg-zinc-950/50"
      />

      <div className="pf:fixed pf:inset-0 pf:w-screen pf:overflow-y-auto pf:pt-6 pf:sm:pt-0">
        <div className="pf:grid pf:min-h-full pf:grid-rows-[1fr_auto_1fr] pf:justify-items-center pf:p-8 pf:sm:grid-rows-[1fr_auto_3fr] pf:sm:p-4">
          <Headless.DialogPanel
            transition
            className={clsx(
              className,
              sizes[size],
              "pf:row-start-2 pf:w-full pf:rounded-2xl pf:bg-white pf:p-8 pf:ring-1 pf:shadow-lg pf:ring-zinc-950/10 pf:sm:rounded-2xl pf:sm:p-6 pf:dark:bg-zinc-900 pf:dark:ring-white/10 pf:forced-colors:outline",
              "pf:transition pf:duration-100 pf:will-change-transform pf:data-closed:opacity-0 pf:data-enter:ease-out pf:data-closed:data-enter:scale-95 pf:data-leave:ease-in"
            )}
          >
            {children}
          </Headless.DialogPanel>
        </div>
      </div>
    </Headless.Dialog>
  );
}

export function AlertTitle({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DialogTitleProps,
  "as" | "className"
>) {
  return (
    <Headless.DialogTitle
      {...props}
      className={clsx(
        className,
        "pf:text-center pf:text-base/6 pf:font-semibold pf:text-balance pf:text-zinc-950 pf:sm:text-left pf:sm:text-sm/6 pf:sm:text-wrap pf:dark:text-white"
      )}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: { className?: string } & Omit<
  Headless.DescriptionProps<typeof Text>,
  "as" | "className"
>) {
  return (
    <Headless.Description
      as={Text}
      {...props}
      className={clsx(
        className,
        "pf:mt-2 pf:text-center pf:text-pretty pf:sm:text-left"
      )}
    />
  );
}

export function AlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={clsx(className, "pf:mt-4")} />;
}

export function AlertActions({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "pf:mt-6 pf:flex pf:flex-col-reverse pf:items-center pf:justify-end pf:gap-3 pf:*:w-full pf:sm:mt-4 pf:sm:flex-row pf:sm:*:w-auto"
      )}
    />
  );
}
