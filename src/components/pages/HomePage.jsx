import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/organisms/HeroSection';
import StatisticsSection from '@/components/organisms/StatisticsSection';
import FeaturedPropertiesGrid from '@/components/organisms/FeaturedPropertiesGrid';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import CTABanner from '@/components/organisms/CTABanner';
import * as propertyService from '@/services/api/propertyService';

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    setLoading(true);
    try {
      const properties = await propertyService.getAll();
      setFeaturedProperties(properties.slice(0, 6)); // Get first 6 properties as featured
    } catch (error) {
      console.error('Failed to load featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatisticsSection />
      <FeaturedPropertiesGrid properties={featuredProperties} loading={loading} />
      <FeaturesSection />
      <CTABanner />
    </div>
  );
};

export default HomePage;