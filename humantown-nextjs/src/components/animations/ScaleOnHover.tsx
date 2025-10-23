'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export default function ScaleOnHover({
  children,
  scale = 1.05,
  className = '',
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
