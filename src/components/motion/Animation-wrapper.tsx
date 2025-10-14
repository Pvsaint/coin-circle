"use client";

import type { ReactNode } from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";
import { useMemo } from "react";

type AnimationVariant =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "bounce"
  | "none";

interface AnimationWrapperProps extends Omit<MotionProps, "variants"> {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number | "some" | "all";
}

const createVariants = (
  variant: AnimationVariant,
  duration: number,
  delay: number
): Variants => {
  const baseTransition = {
    duration,
    delay,
    ease: [0.4, 0, 0.2, 1] as const,
  };

  const variantMap: Record<AnimationVariant, Variants> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: baseTransition },
    },
    slideUp: {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: baseTransition },
    },
    slideDown: {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: baseTransition },
    },
    slideLeft: {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: baseTransition },
    },
    slideRight: {
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: baseTransition },
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: baseTransition },
    },
    bounce: {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay,
        },
      },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  return variantMap[variant];
};

export default function AnimationWrapper({
  children,
  variant = "fadeIn",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  amount = 0.3,
  ...props
}: AnimationWrapperProps) {
  // Memoize variants to prevent recreation on every render
  const variants = useMemo(
    () => createVariants(variant, duration, delay),
    [variant, duration, delay]
  );

  // If variant is "none", render without motion
  if (variant === "none") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
