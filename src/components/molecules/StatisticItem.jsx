import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const StatisticItem = ({ icon, label, value, delay, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className={`text-center ${className}`}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
        <ApperIcon name={icon} className="w-6 h-6 text-primary" />
      </div>
      <Text as="div" className="text-2xl font-display font-semibold text-surface-900 mb-1">
        {value}
      </Text>
      <Text as="div" className="text-surface-600 text-sm">
        {label}
      </Text>
    </motion.div>
  );
};

export default StatisticItem;