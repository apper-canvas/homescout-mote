import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Image from '@/components/atoms/Image';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';

const ImageModal = ({ show, images, currentImageIndex, onNext, onPrev, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
              <MotionButton
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </MotionButton>
              {images.length > 1 && (
                <>
                  <MotionButton
                    onClick={onPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" className="w-6 h-6" />
                  </MotionButton>
                  <MotionButton
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ApperIcon name="ChevronRight" className="w-6 h-6" />
                  </MotionButton>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
                <Text as="span">{currentImageIndex + 1} / {images.length}</Text>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;