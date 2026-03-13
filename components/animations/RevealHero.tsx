"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

import { ReactNode } from "react";

export default function RevealHero({
  children,
  width = "fit-content",
  className = "",
  bgColor = "bg-primary/35",
  delay = 0,
}: {
  children: ReactNode;
  width?: string;
  className?: string;
  bgColor?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      style={{ width }}
      className={cn(className, "relative overflow-hidden")}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 origin-left rounded-xl",
          bgColor,
        )}
        initial={reduceMotion ? { scaleX: 0 } : { scaleX: 1 }}
        whileInView={reduceMotion ? { scaleX: 0 } : { scaleX: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          duration: 0.7,
          delay: delay + 0.08,
          ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        }}
      />
      <motion.div
        initial={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 26, filter: "blur(8px)" }
        }
        whileInView={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          duration: 0.72,
          delay: delay + 0.05,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className="relative z-10 py-1"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
