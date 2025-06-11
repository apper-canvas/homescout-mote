import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';
import * as savedPropertyService from '@/services/api/savedPropertyService';

const PropertyDetailHeader = ({ propertyId }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedItems = await savedPropertyService.getAll();
        setIsSaved(savedItems.some(item => item.propertyId === propertyId));
      } catch (error) {
        console.error('Failed to check saved status:', error);
      }
    };
    checkSavedStatus();
  }, [propertyId]);

  const handleSaveProperty = async () => {
    try {
      if (isSaved) {
        await savedPropertyService.delete(propertyId);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: propertyId,
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

  return (
    <div className="flex items-center justify-between mb-8">
      <MotionButton
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-surface-600 hover:text-primary transition-colors"
      >
        <ApperIcon name="ArrowLeft" className="w-5 h-5" />
        <Text as="span">Back</Text>
      </MotionButton>
      
      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSaveProperty}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isSaved
            ? 'bg-accent text-white'
            : 'bg-white text-surface-600 border border-surface-300 hover:border-accent'
        }`}
      >
        <ApperIcon 
          name="Heart" 
          className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
        />
        <Text as="span">{isSaved ? 'Saved' : 'Save'}</Text>
      </MotionButton>
    </div>
  );
};

export default PropertyDetailHeader;