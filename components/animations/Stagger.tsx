"use client";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared ease for fluid, premium typography/card reveals
 */
export const SPRING_TRANSITION = {
  type: "spring",
  damping: 30,
  stiffness: 200,
  mass: 1,
};

export const EASE_TRANSITION: [number, number, number, number] = [
  0.21, 0.47, 0.32, 0.98,
]; // standard soft ease

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  viewportAmount = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  viewportAmount?: number;
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView={reduceMotion ? "hidden" : "visible"} // If reduced motion, we just don't stagger, but items still show
      viewport={{ once, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  type = "bottomUp",
}: {
  children: ReactNode;
  className?: string;
  type?: "bottomUp" | "scaleOut" | "fadeIn" | "blurIn";
}) {
  const reduceMotion = useReducedMotion();

  const variants: Record<string, Variants> = {
    bottomUp: {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 220, damping: 24 },
      },
    },
    scaleOut: {
      hidden: { opacity: 0, scale: 0.92, y: 10 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 24 },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    },
    blurIn: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.6, ease: EASE_TRANSITION },
      },
    },
  };

  const selectedVariant = variants[type];
  const staticState = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      variants={
        (reduceMotion
          ? { hidden: staticState, visible: staticState }
          : selectedVariant) as Variants
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
