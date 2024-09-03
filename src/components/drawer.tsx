"use client";

import { motion, type Variants } from "framer-motion";
import { setCookie } from "typescript-cookie";

import { classNames } from "~/utils/core";
import { useGlobalStore } from "~/providers/global";

export const Drawer = () => {
  const { pinned, togglePinned } = useGlobalStore((s) => s);

  const handlePinSidebar = () => {
    togglePinned();
    setCookie("user-sidebar-pinned", !pinned, {
      sameSite: "Lax",
      expires: 365,
    });
  };

  const variants = {
    collapsed: {
      transform: "translateX(-75%)",
      opacity: 0,
      filter: "blur(2px)",
    },
    pinned: {
      transform: "translateX(0%)",
      opacity: 1,
      filter: "blur(0px)",
    },
  } as const satisfies Variants;

  const defaultVariant: keyof typeof variants = pinned ? "pinned" : "collapsed";

  return (
    <motion.nav
      className={classNames(
        "fixed inset-0 z-[100] w-72 bg-neutral-950 p-8 backdrop-blur-md",
        {
          "bottom-1 left-1 top-1 rounded-xl border border-neutral-800 shadow-lg shadow-black/20":
            !pinned,
        },
      )}
      variants={variants}
      initial={defaultVariant}
      whileHover="pinned"
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        ease: "easeInOut",
        duration: 0.2,
      }}
    >
      <button onClick={handlePinSidebar}>Pin sidebar</button>
      <div className="flex flex-col gap-8"></div>
    </motion.nav>
  );
};
