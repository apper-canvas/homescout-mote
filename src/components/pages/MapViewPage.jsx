import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import MapDisplay from '@/components/organisms/MapDisplay';
import MapSidebar from '@/components/organisms/MapSidebar';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorStateMessage from '@/components/organisms/ErrorStateMessage';
import * as propertyService from '@/services/api/propertyService';

const MapViewPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleClearSelection = () => {
    setSelectedProperty(null);
  };

  if (loading) {
    return (
      <LoadingSkeleton type="map-sidebar" />
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ErrorStateMessage 
          title="Error Loading Map" 
          message={error} 
          onRetry={loadProperties} 
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <MapDisplay 
        properties={properties} 
        selectedProperty={selectedProperty} 
        onMarkerClick={handleMarkerClick} 
      />
      <MapSidebar 
        properties={properties} 
        selectedProperty={selectedProperty} 
        onClearSelection={handleClearSelection} 
        onPropertySelect={handleMarkerClick} 
      />
    </div>
  );
};

export default MapViewPage;