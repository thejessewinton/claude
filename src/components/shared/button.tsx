import {
  forwardRef,
  type ComponentPropsWithRef,
  type ReactNode,
  type Ref,
} from "react";
import Link, { type LinkProps } from "next/link";
import { classNames } from "~/utils/core";

type ButtonProps =
  | ({
      href?: never;
      icon?: ReactNode;
      disabled?: boolean;
    } & ComponentPropsWithRef<"button">)
  | ({
      href: string;
      icon?: ReactNode;
      disabled?: boolean;
    } & ComponentPropsWithRef<"a"> &
      LinkProps<string>);

export const Button = forwardRef(
  (
    { children, icon, className, disabled, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const sharedClasses = classNames(
      "relative flex min-h-8 w-fit cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-lg px-6 text-sm outline-none transition-colors focus:ring-1 focus:ring-sky-600/75 disabled:cursor-not-allowed disabled:opacity-70",
      "bg-orange-800 hover:bg-orange-700 transition-colors duration-500 text-white",
      className,
    );

    if (props.href === undefined) {
      return (
        <button
          className={sharedClasses}
          disabled={disabled}
          ref={ref as Ref<HTMLButtonElement>}
          {...props}
        >
          {icon ? icon : null}
          {children}
        </button>
      );
    }

    return (
      <Link
        className={sharedClasses}
        ref={ref as Ref<HTMLAnchorElement>}
        {...props}
      >
        {icon ? icon : null}
        {children}
      </Link>
    );
  },
);

Button.displayName = "Button";
