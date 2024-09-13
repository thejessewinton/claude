"use client";

import { motion, type Variants } from "framer-motion";
import { setCookie } from "typescript-cookie";

import { classNames } from "~/utils/core";
import { useGlobalStore } from "~/state/global";
import { PushPin, PushPinSlash } from "@phosphor-icons/react";

export const Sidebar = () => {
  const { pinned, togglePinned } = useGlobalStore((s) => s);
  const defaultVariant: keyof typeof variants = pinned ? "pinned" : "unpinned";

  const handlePinSidebar = () => {
    togglePinned();
    setCookie("user-sidebar-pinned", !pinned, {
      sameSite: "Lax",
      expires: 365,
    });
  };

  const variants = {
    unpinned: {
      transform: "translateX(-15%)",
      opacity: 0,
      filter: "blur(2px)",
    },
    pinned: {
      transform: "translateX(0%)",
      opacity: 1,
      filter: "blur(0px)",
    },
  } as const satisfies Variants;

  return (
    <motion.nav
      className="z-20 h-screen max-md:pointer-events-none max-md:fixed"
      animate="width"
      variants={{
        width: {
          width: pinned ? "18rem" : "4.5rem",
        },
      }}
      initial="width"
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        ease: "easeInOut",
        duration: 0.2,
      }}
    >
      <motion.div
        className={classNames(
          "fixed inset-0 z-[100] flex w-72 flex-col bg-stone-900 p-8 backdrop-blur-md",
          {
            "bottom-1 top-1 rounded-r-xl border border-stone-700 shadow-lg shadow-black/20":
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
        <button onClick={handlePinSidebar} className="ml-auto mr-0">
          {pinned ? <PushPinSlash /> : <PushPin />}
        </button>
        <div className="flex flex-col gap-8"></div>
      </motion.div>
    </motion.nav>
  );
};
