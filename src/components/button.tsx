import Link, { LinkProps } from "next/link";
import { ComponentPropsWithRef, ReactNode } from "react";

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

export const Button = ({
  children,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  if (props.href !== undefined) {
    return (
      <Link className={className} {...props}>
        {children}
      </Link>
    );
  }
  return <button disabled={disabled} {...props}></button>;
};
