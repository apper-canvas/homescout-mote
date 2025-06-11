import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import PropertyCard from '@/components/organisms/PropertyCard';
import Button from '@/components/atoms/Button';
import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';

const MapSidebar = ({ properties, selectedProperty, onClearSelection, onPropertySelect }) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${Math.round(price / 1000)}K`;
    }
    return `$${price}`;
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  return (
    <div className="w-96 bg-white shadow-lg overflow-y-auto">
      <div className="p-6 border-b border-surface-200">
        <Text as="h2" className="text-xl font-semibold text-surface-900 mb-2">Properties on Map</Text>
        <Text as="p" className="text-surface-600 text-sm">
          {properties.length} properties found
        </Text>
      </div>

      <div className="p-6 space-y-4 overflow-y-auto max-h-full">
        {selectedProperty ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Text as="h3" className="font-semibold text-surface-900">Selected Property</Text>
              <Button
                onClick={onClearSelection}
                className="text-surface-400 hover:text-surface-600"
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </Button>
            </div>
            <PropertyCard property={selectedProperty} viewMode="list" />
          </motion.div>
        ) : (
          <div className="text-center py-8 mb-6">
            <ApperIcon name="MousePointer" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
            <Text as="p" className="text-surface-500 text-sm">
              Click on a property marker to view details
            </Text>
          </div>
        )}

        {/* All Properties List */}
        <div>
          <Text as="h3" className="font-semibold text-surface-900 mb-4">All Properties</Text>
          <div className="space-y-3">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onPropertySelect(property)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedProperty?.id === property.id
                    ? 'border-primary bg-primary/5'
                    : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Image
                    src={property.images[0]}
                    alt={property.address}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Text as="div" className="font-semibold text-surface-900 text-sm truncate">
                      {property.address}
                    </Text>
                    <Text as="div" className="text-primary font-display font-semibold">
                      {formatPrice(property.price)}
                    </Text>
                    <div className="flex items-center space-x-3 text-xs text-surface-500 mt-1">
                      <Text as="span">{property.bedrooms} bed</Text>
                      <Text as="span">{property.bathrooms} bath</Text>
                      <Text as="span">{property.squareFeet?.toLocaleString()} sqft</Text>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSidebar;