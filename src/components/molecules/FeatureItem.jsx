import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const FeatureItem = ({ icon, title, description, delay, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      className={`text-center group ${className}`}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
        <ApperIcon name={icon} className="w-8 h-8 text-white" />
      </div>
      <Text as="h3" className="text-xl font-semibold text-surface-900 mb-3">
        {title}
      </Text>
      <Text as="p" className="text-surface-600 leading-relaxed">
        {description}
      </Text>
    </motion.div>
  );
};

export default FeatureItem;