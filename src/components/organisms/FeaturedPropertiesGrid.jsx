import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import SectionHeader from '@/components/molecules/SectionHeader';
import PropertyCard from '@/components/organisms/PropertyCard';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import MotionButton from '@/components/molecules/MotionButton';
import Text from '@/components/atoms/Text';

const FeaturedPropertiesGrid = ({ properties, loading }) => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-surface-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Featured Properties"
          description="Discover our handpicked selection of premium properties available now"
        />

        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <MotionButton
            onClick={() => navigate('/search')}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center space-x-2"
          >
            <Text as="span">View All Properties</Text>
            <ApperIcon name="ArrowRight" className="w-4 h-4" />
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesGrid;