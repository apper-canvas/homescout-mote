import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const PropertyLocationMap = ({ address }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4">Location</Text>
      <div className="w-full h-48 bg-surface-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="MapPin" className="w-8 h-8 text-surface-400 mx-auto mb-2" />
          <Text as="p" className="text-surface-600 text-sm break-words">{address}</Text>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocationMap;