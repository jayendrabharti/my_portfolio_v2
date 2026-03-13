"use client";
import {
  motion,
  useReducedMotion,
  Variants,
  TargetAndTransition,
} from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  type = "bottomUp",
  duration = 0.6,
  delay = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  type?:
    | "bottomUp"
    | "topDown"
    | "scaleOut"
    | "leftRight"
    | "rightLeft"
    | "fadeIn";
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  const variants: Record<string, Variants> = {
    bottomUp: {
      hidden: { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0 },
    },
    topDown: {
      hidden: { opacity: 0, y: -28 },
      visible: { opacity: 1, y: 0 },
    },
    scaleOut: {
      hidden: { scale: 0.9, opacity: 0, y: 12 },
      visible: { scale: 1, opacity: 1 },
    },
    leftRight: {
      hidden: { opacity: 0, x: -32 },
      visible: { opacity: 1, x: 0 },
    },
    rightLeft: {
      hidden: { opacity: 0, x: 32 },
      visible: { opacity: 1, x: 0 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  const selectedVariant = variants[type];
  const staticState = { opacity: 1, y: 0, x: 0, scale: 1 };

  return (
    <motion.div
      initial={
        reduceMotion
          ? staticState
          : (selectedVariant.hidden as TargetAndTransition)
      }
      whileInView={
        reduceMotion
          ? staticState
          : (selectedVariant.visible as TargetAndTransition)
      }
      viewport={{ once, amount, margin: "0px 0px -80px 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
