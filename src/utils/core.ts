import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { type ClassValue } from "clsx";
import MarkdownIt from "markdown-it";

export const classNames = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const renderMarkdown = (markdown: string) => {
  const md = MarkdownIt({
    html: true,
    linkify: true,
  });

  return md.render(markdown);
};
