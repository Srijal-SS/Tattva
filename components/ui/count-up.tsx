"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

/** Counts from 0 up to a number once, easing out; shows the final number straight away under reduced motion. */
export function CountUp({ to, delay = 0.5 }: { to: number; delay?: number }) {
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) return value.set(to);
    const controls = animate(value, to, { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay });
    return () => controls.stop();
  }, [to, reduce, value, delay]);

  return <motion.span>{rounded}</motion.span>;
}
