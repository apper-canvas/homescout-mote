import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import * as savedPropertyService from '../services/api/savedPropertyService';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleSaveProperty = async (e) => {
    e.stopPropagation();
    try {
      if (isSaved) {
        await savedPropertyService.delete(property.id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
          savedDate: new Date().toISOString(),
          notes: ''
        });
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update saved property');
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        onClick={handleCardClick}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-80 h-64 md:h-48 overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.address}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <ApperIcon name="ChevronRight" className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Price Badge */}
            <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 shadow-sm">
              <span className="text-lg font-display font-semibold text-surface-900">
                {formatPrice(property.price)}
              </span>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveProperty}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <ApperIcon 
                name="Heart" 
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'text-accent fill-current' : 'text-surface-400'
                }`}
              />
            </motion.button>

            {/* Image Indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-surface-900 mb-2 line-clamp-2">
                  {property.address}
                </h3>
                
                <p className="text-surface-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bed" className="w-4 h-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Bath" className="w-4 h-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Square" className="w-4 h-4" />
                    <span>{formatSquareFeet(property.squareFeet)} sqft</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Calendar" className="w-4 h-4" />
                    <span>Built {property.yearBuilt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
                  {property.propertyType}
                </span>
                <span className="text-xs text-surface-500">
                  Listed {new Date(property.listingDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.address}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
            >
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 shadow-sm">
          <span className="text-lg font-display font-semibold text-surface-900">
            {formatPrice(property.price)}
          </span>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSaveProperty}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <ApperIcon 
            name="Heart" 
            className={`w-5 h-5 transition-colors ${
              isSaved ? 'text-accent fill-current' : 'text-surface-400'
            }`}
          />
        </motion.button>

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-surface-900 mb-2 line-clamp-2">
          {property.address}
        </h3>
        
        <div className="flex items-center space-x-4 text-sm text-surface-600 mb-3">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bed" className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bath" className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Square" className="w-4 h-4" />
            <span>{formatSquareFeet(property.squareFeet)} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
            {property.propertyType}
          </span>
          <span className="text-xs text-surface-500">
            Listed {new Date(property.listingDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;