import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import PropertyStat from '@/components/molecules/PropertyStat';
import Text from '@/components/atoms/Text';

const PropertyOverview = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <Text as="h1" className="text-2xl md:text-3xl font-display font-semibold text-surface-900 mb-2">
            {property.address}
          </Text>
          <Text as="div" className="text-3xl font-display font-bold text-primary">
            {formatPrice(property.price)}
          </Text>
        </div>
        <div className="flex items-center space-x-1 mt-4 sm:mt-0">
          <Text as="span" className="px-3 py-1 bg-surface-100 text-surface-700 rounded-lg text-sm">
            {property.propertyType}
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Bed" className="w-6 h-6 text-primary" />
          </div>
          <Text as="div" className="text-2xl font-semibold text-surface-900">{property.bedrooms}</Text>
          <Text as="div" className="text-sm text-surface-600">Bedrooms</Text>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Bath" className="w-6 h-6 text-secondary" />
          </div>
          <Text as="div" className="text-2xl font-semibold text-surface-900">{property.bathrooms}</Text>
          <Text as="div" className="text-sm text-surface-600">Bathrooms</Text>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Square" className="w-6 h-6 text-accent" />
          </div>
          <Text as="div" className="text-2xl font-semibold text-surface-900">{formatSquareFeet(property.squareFeet)}</Text>
          <Text as="div" className="text-sm text-surface-600">Sq Ft</Text>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ApperIcon name="Calendar" className="w-6 h-6 text-info" />
          </div>
          <Text as="div" className="text-2xl font-semibold text-surface-900">{property.yearBuilt}</Text>
          <Text as="div" className="text-sm text-surface-600">Built</Text>
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;