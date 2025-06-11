import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const PropertyStat = ({ iconName, value, label, iconClass, valueClass, labelClass, containerClass }) => {
  return (
    <div className={`flex items-center space-x-1 ${containerClass}`}>
      <ApperIcon name={iconName} className={`w-4 h-4 ${iconClass}`} />
      <Text as="span" className={`text-sm text-surface-600 ${valueClass}`}>
        {value}
      </Text>
      {label && (
        <Text as="span" className={`text-sm text-surface-600 ${labelClass}`}>
          {label}
        </Text>
      )}
    </div>
  );
};

export default PropertyStat;