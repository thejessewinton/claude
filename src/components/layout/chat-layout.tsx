"use client";

import { motion, type Variants } from "framer-motion";
import { Drawer } from "~/components/ui/drawer";
import { Prompt } from "~/components/ui/prompt";
import { Shadow } from "~/components/ui/shadow";
import { useGlobalStore } from "~/state/global";

export const ChatLayout = () => {
  const { pinned, togglePinned } = useGlobalStore((s) => s);

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
    <motion.div className="flex h-screen w-screen items-center justify-center">
      <div className="fixed left-0 top-0 h-screen">
        <Drawer />
        <Shadow />
      </div>

      <div className="flex h-screen w-full items-center justify-center">
        <Prompt />
      </div>
    </motion.div>
  );
};
