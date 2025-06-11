import React from 'react';
import Text from '@/components/atoms/Text';

const PriceBadge = ({ price, className }) => {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`bg-white rounded-lg px-3 py-1 shadow-sm ${className}`}>
      <Text as="span" className="text-lg font-display font-semibold text-surface-900">
        {formatPrice(price)}
      </Text>
    </div>
  );
};

export default PriceBadge;