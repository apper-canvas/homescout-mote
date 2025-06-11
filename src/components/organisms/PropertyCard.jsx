import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import PriceBadge from '@/components/molecules/PriceBadge';
import CardImageCarousel from '@/components/molecules/CardImageCarousel';
import PropertyStat from '@/components/molecules/PropertyStat';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';
import * as savedPropertyService from '@/services/api/savedPropertyService';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false); // This should ideally be managed by a global state or fetched based on user

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
            <CardImageCarousel images={property.images} altText={property.address} className="h-full" />
            
            <PriceBadge price={property.price} className="absolute top-4 left-4" />

            <MotionButton
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
            </MotionButton>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <Text as="h3" className="text-lg font-semibold text-surface-900 mb-2 line-clamp-2">
                  {property.address}
                </Text>
                
                <Text as="p" className="text-surface-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </Text>

                <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 mb-4">
                  <PropertyStat iconName="Bed" value={property.bedrooms} label="beds" />
                  <PropertyStat iconName="Bath" value={property.bathrooms} label="baths" />
                  <PropertyStat iconName="Square" value={`${formatSquareFeet(property.squareFeet)}`} label="sqft" />
                  <PropertyStat iconName="Calendar" value={`Built ${property.yearBuilt}`} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Text as="span" className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
                  {property.propertyType}
                </Text>
                <Text as="span" className="text-xs text-surface-500">
                  Listed {new Date(property.listingDate).toLocaleDateString()}
                </Text>
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
        <CardImageCarousel images={property.images} altText={property.address} className="h-full" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        <PriceBadge price={property.price} className="absolute top-4 left-4" />

        <MotionButton
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
        </MotionButton>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <Text as="h3" className="text-lg font-semibold text-surface-900 mb-2 line-clamp-2">
          {property.address}
        </Text>
        
        <div className="flex items-center space-x-4 text-sm text-surface-600 mb-3">
          <PropertyStat iconName="Bed" value={property.bedrooms} />
          <PropertyStat iconName="Bath" value={property.bathrooms} />
          <PropertyStat iconName="Square" value={`${formatSquareFeet(property.squareFeet)} sqft`} />
        </div>

        <div className="flex items-center justify-between">
          <Text as="span" className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
            {property.propertyType}
          </Text>
          <Text as="span" className="text-xs text-surface-500">
            Listed {new Date(property.listingDate).toLocaleDateString()}
          </Text>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;