import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import PropertyCard from '@/components/organisms/PropertyCard';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorStateMessage from '@/components/organisms/ErrorStateMessage';
import EmptyStateMessage from '@/components/organisms/EmptyStateMessage';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import MotionButton from '@/components/molecules/MotionButton';
import * as savedPropertyService from '@/services/api/savedPropertyService';
import * as propertyService from '@/services/api/propertyService';

const SavedPropertiesPage = () => {
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
        <LoadingSkeleton count={6} type="card" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <ErrorStateMessage 
          title="Error Loading Saved Properties" 
          message={error} 
          onRetry={loadSavedProperties} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <Text as="h1" className="text-3xl font-display font-semibold text-surface-900 mb-2">
            Saved Properties
          </Text>
          <Text as="p" className="text-surface-600">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
          </Text>
        </div>
        
        {properties.length > 0 && (
          <Button
            onClick={handleClearAll}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 text-surface-600 hover:text-error border border-surface-300 rounded-lg hover:border-error transition-colors"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
            <Text as="span">Clear All</Text>
          </Button>
        )}
      </div>

      {/* Content */}
      {properties.length === 0 ? (
        <EmptyStateMessage
          iconName="Heart"
          title="No saved properties yet"
          message="Start exploring properties and save your favorites to see them here. You can save properties by clicking the heart icon."
          buttonText="Explore Properties"
          onButtonClick={() => window.location.href = '/search'}
        />
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
              <MotionButton
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
              </MotionButton>
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
          <Text as="h3" className="text-lg font-semibold text-surface-900 mb-4 flex items-center space-x-2">
            <ApperIcon name="Lightbulb" className="w-5 h-5 text-warning" />
            <Text as="span">Tips for Your Saved Properties</Text>
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-surface-600">
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <Text as="span">Compare properties by viewing them side-by-side on separate tabs</Text>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <Text as="span">Contact agents directly from the property detail pages</Text>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <Text as="span">Use the map view to see all your saved properties at once</Text>
            </div>
            <div className="flex items-start space-x-2">
              <ApperIcon name="Check" className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <Text as="span">Properties are automatically saved across your browsing sessions</Text>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SavedPropertiesPage;