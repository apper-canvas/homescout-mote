import React from 'react';
import SectionHeader from '@/components/molecules/SectionHeader';
import FeatureItem from '@/components/molecules/FeatureItem';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Search',
      title: 'Advanced Search',
      description: 'Filter properties by price, location, size, and dozens of other criteria to find exactly what you need.'
    },
    {
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Create your personal collection of favorite properties and get notified when similar homes become available.'
    },
    {
      icon: 'Map',
      title: 'Interactive Maps',
      description: 'Explore neighborhoods with our detailed maps showing schools, amenities, and transportation options.'
    },
    {
      icon: 'Camera',
      title: 'Virtual Tours',
      description: 'Take immersive virtual tours of properties from the comfort of your home before scheduling visits.'
    },
    {
      icon: 'Bell',
      title: 'Price Alerts',
      description: 'Get instant notifications when properties matching your criteria become available or change price.'
    },
    {
      icon: 'Shield',
      title: 'Verified Listings',
      description: 'All our property listings are verified and regularly updated to ensure accuracy and reliability.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Why Choose HomeScout?"
          description="Experience the future of home searching with our innovative features"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;