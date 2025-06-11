import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const QuickSearchOption = ({ label, onClick, delay, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className={className}
    >
      <Button
        onClick={onClick}
        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
      >
        {label}
      </Button>
    </motion.div>
  );
};

export default QuickSearchOption;