import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import MotionButton from '@/components/molecules/MotionButton';
import MapMarker from '@/components/molecules/MapMarker';
import Text from '@/components/atoms/Text';

const MapDisplay = ({ properties, selectedProperty, onMarkerClick }) => {
  const [zoom, setZoom] = useState(12); // Simulated zoom
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // NYC default

  const handleMarkerClick = (property) => {
    onMarkerClick(property);
    setMapCenter({ lat: property.latitude, lng: property.longitude }); // Simulate centering
  };

  return (
    <div className="flex-1 relative bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Map Placeholder */}
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="text-center">
          <ApperIcon name="Map" className="w-16 h-16 text-surface-400 mx-auto mb-4" />
          <Text as="h3" className="text-lg font-semibold text-surface-700 mb-2">Interactive Map</Text>
          <Text as="p" className="text-surface-500">
            Map integration would show property locations here
          </Text>
        </div>

        {/* Simulated Property Markers */}
        <div className="absolute inset-0">
          {properties.slice(0, 10).map((property, index) => {
            const x = 20 + (index * 8) % 60;
            const y = 20 + (index * 12) % 60;
            
            return (
              <MapMarker
                key={property.id}
                price={property.price}
                isSelected={selectedProperty?.id === property.id}
                onClick={() => handleMarkerClick(property)}
                style={{ left: `${x}%`, top: `${y}%` }}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-20">
        <MotionButton
          onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
          className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </MotionButton>
        <MotionButton
          onClick={() => setZoom(prev => Math.max(prev - 1, 1))}
          className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </MotionButton>
        <MotionButton
          onClick={() => setMapCenter({ lat: 40.7128, lng: -74.0060 })}
          className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-surface-50 transition-colors"
          title="Reset View"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
        </MotionButton>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-20">
        <Text as="h4" className="font-semibold text-surface-900 mb-2 text-sm">Legend</Text>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border-2 border-surface-300 rounded"></div>
            <Text as="span" className="text-surface-600">Available</Text>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded"></div>
            <Text as="span" className="text-surface-600">Selected</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDisplay;