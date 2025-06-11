import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Text as="h2" className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
            Ready to Find Your Perfect Home?
          </Text>
          <Text as="p" className="text-white/90 text-lg mb-8">
            Join thousands of satisfied customers who found their dream homes through HomeScout
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MotionButton
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-white text-secondary rounded-lg hover:bg-surface-50 transition-colors font-medium"
            >
              Start Searching
            </MotionButton>
            <MotionButton
              onClick={() => navigate('/map')}
              className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
            >
              Explore Map
            </MotionButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;