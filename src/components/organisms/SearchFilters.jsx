import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import FilterToggle from '@/components/molecules/FilterToggle';
import ClearFilterTag from '@/components/molecules/ClearFilterTag';

const SearchFilters = ({ filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync local filters with external filters prop
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const propertyTypes = [
    'House', 'Apartment', 'Condo', 'Townhouse', 'Villa', 'Duplex'
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = localFilters.propertyTypes || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    handleFilterChange('propertyTypes', updatedTypes);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      minPrice: 0,
      maxPrice: 2000000,
      minBeds: 0,
      minBaths: 0,
      propertyTypes: [],
      location: '',
      radius: 10
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price}`;
  };

const hasActiveFilters = 
    (localFilters.propertyTypes?.length > 0 || 
    localFilters.minBeds > 0 || 
    localFilters.minBaths > 0 || 
    localFilters.location ||
    localFilters.minPrice > 0 || // Assuming default minPrice is 0
    localFilters.maxPrice < 2000000); // Assuming default maxPrice is 2000000

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <Text as="h3" className="text-lg font-semibold text-surface-900">Search Filters</Text>
        <div className="flex items-center space-x-2">
          <Button
            onClick={clearAllFilters}
            className="text-sm text-surface-500 hover:text-primary transition-colors"
          >
            Clear All
          </Button>
          <Button
            onClick={onClose}
            className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Text as="label" className="block text-sm font-medium text-surface-700">
            Price Range
          </Text>
          <div className="space-y-2">
            <div>
              <Text as="label" className="block text-xs text-surface-500 mb-1">
                Min Price: {formatPrice(localFilters.minPrice)}
              </Text>
              <Input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <Text as="label" className="block text-xs text-surface-500 mb-1">
                Max Price: {formatPrice(localFilters.maxPrice)}
              </Text>
              <Input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-surface-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <Text as="label" className="block text-sm font-medium text-surface-700">
            Minimum Bedrooms
          </Text>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((beds) => (
              <FilterToggle
                key={beds}
                label={beds === 0 ? 'Any' : String(beds)}
                isActive={localFilters.minBeds === beds}
                onClick={() => handleFilterChange('minBeds', beds)}
              />
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <Text as="label" className="block text-sm font-medium text-surface-700">
            Minimum Bathrooms
          </Text>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((baths) => (
              <FilterToggle
                key={baths}
                label={baths === 0 ? 'Any' : String(baths)}
                isActive={localFilters.minBaths === baths}
                onClick={() => handleFilterChange('minBaths', baths)}
              />
            ))}
          </div>
        </div>

        {/* Property Types */}
        <div className="space-y-3 md:col-span-2">
          <Text as="label" className="block text-sm font-medium text-surface-700">
            Property Type
          </Text>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <FilterToggle
                key={type}
                label={type}
                isActive={localFilters.propertyTypes?.includes(type)}
                onClick={() => handlePropertyTypeToggle(type)}
              />
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Text as="label" className="block text-sm font-medium text-surface-700">
            Location
          </Text>
          <div className="relative">
            <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <Input
              type="text"
              value={localFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="Enter city, neighborhood..."
              className="w-full pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-surface-200 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {localFilters.propertyTypes?.map((type) => (
                <ClearFilterTag
                  key={type}
                  label={type}
                  onClear={() => handlePropertyTypeToggle(type)}
                  tagBgClass="bg-primary/10"
                  tagTextClass="text-primary"
                  buttonBgClass="bg-primary/20 hover:bg-primary/30"
                />
              ))}
              
              {localFilters.minBeds > 0 && (
                <ClearFilterTag
                  label={`${localFilters.minBeds}+ beds`}
                  onClear={() => handleFilterChange('minBeds', 0)}
                  tagBgClass="bg-secondary/10"
                  tagTextClass="text-secondary"
                  buttonBgClass="bg-secondary/20 hover:bg-secondary/30"
                />
              )}
              
              {localFilters.minBaths > 0 && (
                <ClearFilterTag
                  label={`${localFilters.minBaths}+ baths`}
                  onClear={() => handleFilterChange('minBaths', 0)}
                  tagBgClass="bg-secondary/10"
                  tagTextClass="text-secondary"
                  buttonBgClass="bg-secondary/20 hover:bg-secondary/30"
                />
              )}
              
              {localFilters.location && (
                <ClearFilterTag
                  label={localFilters.location}
                  onClear={() => handleFilterChange('location', '')}
                  tagBgClass="bg-accent/10"
                  tagTextClass="text-accent"
                  buttonBgClass="bg-accent/20 hover:bg-accent/30"
                />
              )}
              {localFilters.minPrice > 0 && (
                <ClearFilterTag
                  label={`Min Price: ${formatPrice(localFilters.minPrice)}`}
                  onClear={() => handleFilterChange('minPrice', 0)}
                  tagBgClass="bg-info/10"
                  tagTextClass="text-info"
                  buttonBgClass="bg-info/20 hover:bg-info/30"
                />
)}
              {localFilters.maxPrice < 2000000 && (
                <ClearFilterTag
                  label={`Max Price: ${formatPrice(localFilters.maxPrice)}`}
                  onClear={() => handleFilterChange('maxPrice', 2000000)}
                  tagBgClass="bg-info/10"
                  tagTextClass="text-info"
                  buttonBgClass="bg-info/20 hover:bg-info/30"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchFilters;