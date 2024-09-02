"use client";

import { motion, type Variants } from "framer-motion";
import { useGlobalStore } from "~/state/global";

export const Drawer = () => {
  const { pinned, setPinned } = useGlobalStore();
  const variants: Variants = {
    collapsed: {
      transform: "translateX(-15%)",
      opacity: 0,
      filter: "blur(2px)",
    },
    expanded: {
      transform: "translateX(0%)",
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const defaultVariant = pinned === "true" ? "expanded" : "collapsed";

  return (
    <motion.div
      className="fixed inset-0 z-[100] m-2 w-72 rounded-xl border border-neutral-800 bg-neutral-950 shadow-lg shadow-black/20 backdrop-blur-md"
      variants={variants}
      initial={defaultVariant}
      whileHover="expanded"
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40,
        ease: "easeInOut",
        duration: 0.2,
      }}
    >
      <button onClick={() => setPinned(pinned === "false" ? "true" : "false")}>
        Pin sidebar
      </button>
      <div className="flex flex-col gap-8"></div>
    </motion.div>
  );
};
