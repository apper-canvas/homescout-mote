import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const MotionButton = ({ children, className, whileHover, whileTap, initial, animate, transition, ...props }) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default MotionButton;