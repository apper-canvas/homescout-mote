import React from 'react';
import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';

const MapMarker = ({ price, isSelected, onClick, style, delay }) => {
  const formatPrice = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${Math.round(value / 1000)}K`;
    }
    return `$${value}`;
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
        isSelected
          ? 'bg-accent text-white'
          : 'bg-white text-surface-900 hover:bg-primary hover:text-white'
      } px-3 py-2 rounded-lg shadow-lg border-2 border-white transition-all duration-200 z-10`}
      style={style}
    >
      <Text as="div" className="text-xs font-semibold whitespace-nowrap">
        {formatPrice(price)}
      </Text>
    </motion.button>
  );
};

export default MapMarker;