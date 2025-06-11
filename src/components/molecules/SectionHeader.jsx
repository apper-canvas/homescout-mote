import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const SectionHeader = ({ title, description, titleClass, descriptionClass, containerClass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${containerClass}`}
    >
      <Text as="h2" className={`text-3xl md:text-4xl font-display font-semibold text-surface-900 mb-4 ${titleClass}`}>
        {title}
      </Text>
      {description && (
        <Text as="p" className={`text-surface-600 text-lg max-w-2xl mx-auto ${descriptionClass}`}>
          {description}
        </Text>
      )}
    </motion.div>
  );
};

export default SectionHeader;