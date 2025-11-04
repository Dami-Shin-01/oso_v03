'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' }); // Changed from '-50px' to '0px' to trigger immediately

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
