import React from 'react';
import Text from '@/components/atoms/Text';

const PropertyDescription = ({ description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <Text as="h2" className="text-xl font-semibold text-surface-900 mb-4">Description</Text>
      <Text as="p" className="text-surface-600 leading-relaxed break-words">
        {description}
      </Text>
    </div>
  );
};

export default PropertyDescription;