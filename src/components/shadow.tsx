"use client";

import { useState, useEffect, useRef } from "react";

export const Shadow = () => {
  const [opacity, setOpacity] = useState(0);
  const shadowRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shadowRef.current) return;

      const { left, top, width, height } =
        shadowRef.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distance = Math.sqrt(
        Math.pow(centerX - e.clientX, 2) + Math.pow(centerY - e.clientY, 2),
      );

      const maxDistance = Math.sqrt(
        Math.pow(width / 2, 2) + Math.pow(height / 2, 2),
      );
      const newOpacity = Math.max(0, 1 - Math.min(distance / maxDistance));

      setOpacity(newOpacity);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        opacity,
      }}
      ref={shadowRef}
      className="fixed inset-0 w-96 bg-gradient-to-r from-black/30 to-transparent to-80%"
    />
  );
};
