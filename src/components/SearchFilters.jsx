import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const SearchFilters = ({ filters, onFiltersChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    'House',
    'Apartment',
    'Condo',
    'Townhouse',
    'Villa',
    'Duplex'
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-surface-900">Search Filters</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearAllFilters}
            className="text-sm text-surface-500 hover:text-primary transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-surface-700">
            Price Range
          </label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-surface-500 mb-1">
                Min Price: {formatPrice(localFilters.minPrice)}
              </label>
              <input
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
              <label className="block text-xs text-surface-500 mb-1">
                Max Price: {formatPrice(localFilters.maxPrice)}
              </label>
              <input
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
          <label className="block text-sm font-medium text-surface-700">
            Minimum Bedrooms
          </label>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((beds) => (
              <button
                key={beds}
                onClick={() => handleFilterChange('minBeds', beds)}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                  localFilters.minBeds === beds
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-200 bg-white text-surface-600 hover:border-primary'
                }`}
              >
                {beds === 0 ? 'Any' : beds}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-surface-700">
            Minimum Bathrooms
          </label>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4, 5].map((baths) => (
              <button
                key={baths}
                onClick={() => handleFilterChange('minBaths', baths)}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                  localFilters.minBaths === baths
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-200 bg-white text-surface-600 hover:border-primary'
                }`}
              >
                {baths === 0 ? 'Any' : baths}
              </button>
            ))}
          </div>
        </div>

        {/* Property Types */}
        <div className="space-y-3 md:col-span-2">
          <label className="block text-sm font-medium text-surface-700">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => handlePropertyTypeToggle(type)}
                className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                  localFilters.propertyTypes?.includes(type)
                    ? 'border-primary bg-primary text-white'
                    : 'border-surface-200 bg-white text-surface-600 hover:border-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-surface-700">
            Location
          </label>
          <div className="relative">
            <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
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
      {(localFilters.propertyTypes?.length > 0 || localFilters.minBeds > 0 || localFilters.minBaths > 0 || localFilters.location) && (
        <div className="mt-6 pt-6 border-t border-surface-200">
          <div className="flex flex-wrap gap-2">
            {localFilters.propertyTypes?.map((type) => (
              <span
                key={type}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {type}
                <button
                  onClick={() => handlePropertyTypeToggle(type)}
                  className="ml-2 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            ))}
            
            {localFilters.minBeds > 0 && (
              <span className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {localFilters.minBeds}+ beds
                <button
                  onClick={() => handleFilterChange('minBeds', 0)}
                  className="ml-2 w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/30 transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {localFilters.minBaths > 0 && (
              <span className="inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                {localFilters.minBaths}+ baths
                <button
                  onClick={() => handleFilterChange('minBaths', 0)}
                  className="ml-2 w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/30 transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {localFilters.location && (
              <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                {localFilters.location}
                <button
                  onClick={() => handleFilterChange('location', '')}
                  className="ml-2 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/30 transition-colors"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SearchFilters;