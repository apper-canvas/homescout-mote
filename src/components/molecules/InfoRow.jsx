import React from 'react';
import Text from '@/components/atoms/Text';

const InfoRow = ({ label, value, labelClass, valueClass }) => {
  return (
    <div className="flex justify-between">
      <Text as="span" className={`text-surface-600 ${labelClass}`}>
        {label}
      </Text>
      <Text as="span" className={`text-surface-900 font-medium ${valueClass}`}>
        {value}
      </Text>
    </div>
  );
};

export default InfoRow;