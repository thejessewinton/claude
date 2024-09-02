"use client";

import { useEffect, useState } from "react";
import { Drawer as Vaul } from "vaul";
import { useMousePosition } from "~/app/hooks/use-mouse-position";

export const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { x } = useMousePosition();

  useEffect(() => {
    if (x && x <= 100) {
      setIsOpen(true);
    }
    console.log(x);
  }, [x]);

  return (
    <Vaul.Root
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      direction="left"
    >
      <Vaul.Trigger asChild>
        <button>Open</button>
      </Vaul.Trigger>
      <Vaul.Content>
        <Vaul.Title>Drawer title</Vaul.Title>
        This is our drawer content.
      </Vaul.Content>
    </Vaul.Root>
  );
};
