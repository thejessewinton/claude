import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { type ClassValue } from "clsx";

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
