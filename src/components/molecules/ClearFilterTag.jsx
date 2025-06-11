import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const ClearFilterTag = ({ label, onClear, className, tagBgClass, tagTextClass, buttonBgClass }) => {
  return (
    <Text as="span" className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${tagBgClass} ${tagTextClass} ${className}`}>
      {label}
      <Button
        onClick={onClear}
        className={`ml-2 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${buttonBgClass}`}
      >
        <ApperIcon name="X" className="w-3 h-3" />
      </Button>
    </Text>
  );
};

export default ClearFilterTag;