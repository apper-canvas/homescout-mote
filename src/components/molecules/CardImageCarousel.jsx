import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Image from '@/components/atoms/Image';
import Button from '@/components/atoms/Button';

const CardImageCarousel = ({ images, altText, className }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={images[currentImageIndex]}
        alt={altText}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {images.length > 1 && (
        <>
          <Button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          </Button>
          <Button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          >
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
          </Button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
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
  );
};

export default CardImageCarousel;