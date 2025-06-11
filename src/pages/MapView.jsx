import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import * as propertyService from '../services/api/propertyService';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // NYC default
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    loadProperties();
  }, []);

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

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${Math.round(price / 1000)}K`;
    }
    return `$${price}`;
  };

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    setMapCenter({ lat: property.latitude, lng: property.longitude });
  };

  if (loading) {
    return (
      <div className="h-screen flex">
        <div className="flex-1 bg-surface-200 animate-pulse" />
        <div className="w-96 bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div className="h-6 bg-surface-200 rounded animate-pulse" />
            <div className="h-4 bg-surface-200 rounded w-3/4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-surface-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Error Loading Map</h3>
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
    <div className="h-screen flex overflow-hidden">
      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-primary/5 to-secondary/5">
        {/* Map Placeholder */}
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="text-center">
            <ApperIcon name="Map" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-700 mb-2">Interactive Map</h3>
            <p className="text-surface-500">
              Map integration would show property locations here
            </p>
          </div>

          {/* Simulated Property Markers */}
          <div className="absolute inset-0">
            {properties.slice(0, 10).map((property, index) => {
              const x = 20 + (index * 8) % 60;
              const y = 20 + (index * 12) % 60;
              
              return (
                <motion.button
                  key={property.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleMarkerClick(property)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedProperty?.id === property.id
                      ? 'bg-accent text-white'
                      : 'bg-white text-surface-900 hover:bg-primary hover:text-white'
                  } px-3 py-2 rounded-lg shadow-lg border-2 border-white transition-all duration-200 z-10`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="text-xs font-semibold whitespace-nowrap">
                    {formatPrice(property.price)}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2 z-20">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMapCenter({ lat: 40.7128, lng: -74.0060 })}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
            title="Reset View"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-20">
          <h4 className="font-semibold text-surface-900 mb-2 text-sm">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border-2 border-surface-300 rounded"></div>
              <span className="text-surface-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent rounded"></div>
              <span className="text-surface-600">Selected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-96 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-surface-200">
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Properties on Map</h2>
          <p className="text-surface-600 text-sm">
            {properties.length} properties found
          </p>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-full">
          {selectedProperty ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-surface-900">Selected Property</h3>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-surface-400 hover:text-surface-600"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </button>
              </div>
              <PropertyCard property={selectedProperty} viewMode="list" />
            </motion.div>
          ) : (
            <div className="text-center py-8 mb-6">
              <ApperIcon name="MousePointer" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-500 text-sm">
                Click on a property marker to view details
              </p>
            </div>
          )}

          {/* All Properties List */}
          <div>
            <h3 className="font-semibold text-surface-900 mb-4">All Properties</h3>
            <div className="space-y-3">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMarkerClick(property)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedProperty?.id === property.id
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={property.images[0]}
                      alt={property.address}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-surface-900 text-sm truncate">
                        {property.address}
                      </div>
                      <div className="text-primary font-display font-semibold">
                        {formatPrice(property.price)}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-surface-500 mt-1">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.squareFeet?.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;