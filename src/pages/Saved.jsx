import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import * as savedPropertyService from '../services/api/savedPropertyService';
import * as propertyService from '../services/api/propertyService';

const Saved = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const [savedResult, propertiesResult] = await Promise.all([
        savedPropertyService.getAll(),
        propertyService.getAll()
      ]);
      
      setSavedProperties(savedResult);
      
      // Filter properties to only show saved ones
      const savedPropertyIds = savedResult.map(saved => saved.propertyId);
      const filteredProperties = propertiesResult.filter(property => 
        savedPropertyIds.includes(property.id)
      );
      
      setProperties(filteredProperties);
    } catch (err) {
      setError(err.message || 'Failed to load saved properties');
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      await savedPropertyService.delete(propertyId);
      setSavedProperties(prev => prev.filter(saved => saved.propertyId !== propertyId));
      setProperties(prev => prev.filter(property => property.id !== propertyId));
      toast.success('Property removed from saved');
    } catch (error) {
      toast.error('Failed to remove property');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to remove all saved properties?')) {
      try {
        // Remove all saved properties
        await Promise.all(
          savedProperties.map(saved => savedPropertyService.delete(saved.propertyId))
        );
        setSavedProperties([]);
        setProperties([]);
        toast.success('All saved properties removed');
      } catch (error) {
        toast.error('Failed to clear saved properties');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="h-8 bg-surface-200 rounded w-48 mb-2 animate-pulse" />
          <div className="h-4 bg-surface-200 rounded w-64 animate-pulse" />
        </div>
        
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
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Error Loading Saved Properties</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button
            onClick={loadSavedProperties}
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-surface-900 mb-2">
            Saved Properties
          </h1>
          <p className="text-surface-600">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
        
        {properties.length > 0 && (
          <button
            onClick={handleClearAll}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-error border border-surface-300 rounded-lg hover:border-error transition-colors"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Content */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Heart" className="w-20 h-20 text-surface-300 mx-auto" />
          </motion.div>
          <h3 className="mt-6 text-xl font-semibold text-surface-900">No saved properties yet</h3>
          <p className="mt-2 text-surface-500 mb-8 max-w-md mx-auto">
            Start exploring properties and save your favorites to see them here. You can save properties by clicking the heart icon.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/search'}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center space-x-2"
          >
            <ApperIcon name="Search" className="w-4 h-4" />
            <span>Explore Properties</span>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <PropertyCard property={property} />
              
              {/* Remove Button Overlay */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProperty(property.id);
                }}
                className="absolute top-2 right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-error/90 transition-colors shadow-lg z-10"
                title="Remove from saved"
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Tips Section */}
      {properties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
            <ApperIcon name="Lightbulb" className="w-5 h-5 text-warning" />
            <span>Tips for Your Saved Properties</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-surface-600">
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>Compare properties by viewing them side-by-side on separate tabs</span>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>Contact agents directly from the property detail pages</span>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>Use the map view to see all your saved properties at once</span>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>Properties are automatically saved across your browsing sessions</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Saved;