"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function AppearingText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.065,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(6px)", y: 14 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView={reduceMotion ? "hidden" : "visible"}
      viewport={{ once: true, amount: 0.8 }}
      animate={reduceMotion ? "visible" : undefined}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="mr-2 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
