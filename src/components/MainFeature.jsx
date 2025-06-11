import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import PropertyCard from './PropertyCard';
import SearchFilters from './SearchFilters';
import * as propertyService from '../services/api/propertyService';

const MainFeature = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000000,
    minBeds: 0,
    minBaths: 0,
    propertyTypes: [],
    location: '',
    radius: 10
  });

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters, searchTerm]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getAll();
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price >= filters.minPrice && property.price <= filters.maxPrice
    );

    // Bedrooms filter
    if (filters.minBeds > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.minBeds);
    }

    // Bathrooms filter
    if (filters.minBaths > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.minBaths);
    }

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyTypes.includes(property.propertyType)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-48 bg-surface-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-surface-200 rounded animate-pulse" />
                <div className="h-4 bg-surface-200 rounded w-3/4 animate-pulse" />
                <div className="flex space-x-4">
                  <div className="h-4 bg-surface-200 rounded w-16 animate-pulse" />
                  <div className="h-4 bg-surface-200 rounded w-16 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-12">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Error Loading Properties</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadProperties}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-full overflow-hidden">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-display font-semibold text-surface-900 mb-2">
              Find Your Perfect Home
            </h1>
            <p className="text-surface-600">
              Discover amazing properties in your desired location
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                showFilters
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-surface-600 border-surface-300 hover:border-primary'
              }`}
            >
              <ApperIcon name="Filter" className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex bg-surface-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-surface-500 hover:text-primary'
                }`}
              >
                <ApperIcon name="Grid3X3" className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-surface-500 hover:text-primary'
                }`}
              >
                <ApperIcon name="List" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by location, address, or description..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
          />
        </form>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-surface-600">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
        </p>
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto" />
          </motion.div>
          <h3 className="mt-4 text-lg font-semibold text-surface-900">No properties found</h3>
          <p className="mt-2 text-surface-500 mb-4">
            Try adjusting your search criteria or browse all properties
          </p>
          <button
            onClick={() => {
              setFilters({
                minPrice: 0,
                maxPrice: 2000000,
                minBeds: 0,
                minBaths: 0,
                propertyTypes: [],
                location: '',
                radius: 10
              });
              setSearchTerm('');
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6'
          }
        >
          <AnimatePresence>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard 
                  property={property} 
                  viewMode={viewMode}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default MainFeature;