"use client";

import { motion, type Variants } from "framer-motion";
import { Sidebar } from "~/components/ui/sidebar";
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
    <>
      <Sidebar />
      <Shadow />

      <motion.div className="min-h-full w-full min-w-0 flex-1">
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col items-center justify-center gap-8 px-4 pb-20 pt-12">
          <Prompt />
        </main>
      </motion.div>
    </>
  );
};
