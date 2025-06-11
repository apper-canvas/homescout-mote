import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Image from '@/components/atoms/Image';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';

const PropertyImageGallery = ({ images, address, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleMainImageClick = () => {
    onImageClick(currentImageIndex);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div className="lg:col-span-2">
        <div className="relative h-96 rounded-xl overflow-hidden group cursor-pointer">
          <Image
            src={images[currentImageIndex]}
            alt={address}
            className="w-full h-full object-cover"
            onClick={handleMainImageClick}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <MotionButton
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5" />
              </MotionButton>
              <MotionButton
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5" />
              </MotionButton>
            </>
          )}
          
          {/* Image Count */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
            <Text as="span">{currentImageIndex + 1} / {images.length}</Text>
          </div>
        </div>
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="space-y-4 overflow-y-auto max-h-96">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative h-44 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
              index === currentImageIndex ? 'ring-2 ring-primary' : 'hover:opacity-75'
            }`}
          >
            <Image
              src={image}
              alt={`${address} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {images.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                <Text as="span">+{images.length - 4} more</Text>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImageGallery;