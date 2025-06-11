import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '@/components/molecules/SectionHeader';
import HeroSearchInput from '@/components/molecules/HeroSearchInput';
import QuickSearchOption from '@/components/molecules/QuickSearchOption';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/search');
    }
  };

  const quickSearchOptions = [
    { label: 'Under $500K', query: 'maxPrice=500000' },
    { label: '3+ Bedrooms', query: 'minBeds=3' },
    { label: 'Condos', query: 'type=Condo' },
    { label: 'New Listings', query: 'sort=newest' }
  ];

  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          title="Find Your Dream Home"
          description="Discover the perfect property in your ideal location with our comprehensive search tools"
          titleClass="text-4xl md:text-6xl font-display font-semibold mb-6"
          descriptionClass="text-xl md:text-2xl text-white/90 mb-8"
          containerClass="text-center max-w-4xl mx-auto"
        />

        <HeroSearchInput
          searchTerm={searchTerm}
          onSearchTermChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {quickSearchOptions.map((option, index) => (
            <QuickSearchOption
              key={index}
              label={option.label}
              onClick={() => navigate(`/search?${option.query}`)}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;