import React from 'react';
import Text from '@/components/atoms/Text';
import InfoRow from '@/components/molecules/InfoRow';

const PropertyInfoSidebar = ({ property }) => {
  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4">Property Details</Text>
      <div className="space-y-3">
        <InfoRow label="Property Type" value={property.propertyType} />
        <InfoRow label="Year Built" value={property.yearBuilt} />
        <InfoRow label="Lot Size" value={`${formatSquareFeet(property.lotSize)} sqft`} />
        <InfoRow label="Listed" value={new Date(property.listingDate).toLocaleDateString()} />
      </div>
    </div>
  );
};

export default PropertyInfoSidebar;