import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';

const EmptyStateMessage = ({ iconName, title, message, buttonText, onButtonClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-16"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ApperIcon name={iconName} className="w-20 h-20 text-surface-300 mx-auto" />
      </motion.div>
      <Text as="h3" className="mt-6 text-xl font-semibold text-surface-900">{title}</Text>
      <Text as="p" className="mt-2 text-surface-500 mb-8 max-w-md mx-auto">
        {message}
      </Text>
      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onButtonClick}
        className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center space-x-2"
      >
        <ApperIcon name="Search" className="w-4 h-4" />
        <Text as="span">{buttonText}</Text>
      </MotionButton>
    </motion.div>
  );
};

export default EmptyStateMessage;