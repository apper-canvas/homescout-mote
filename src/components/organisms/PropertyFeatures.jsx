import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const PropertyFeatures = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <Text as="h2" className="text-xl font-semibold text-surface-900 mb-4">Features & Amenities</Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ApperIcon name="Check" className="w-4 h-4 text-success flex-shrink-0" />
            <Text as="span" className="text-surface-600 break-words">{feature}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;