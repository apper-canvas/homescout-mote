import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const HeroSearchInput = ({ searchTerm, onSearchTermChange, onSearchSubmit, className }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={onSearchSubmit}
      className={`max-w-2xl mx-auto ${className}`}
    >
      <div className="relative">
        <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Enter location, address, or property type..."
          className="w-full pl-12 pr-32 py-4 text-surface-900 bg-white rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all duration-200 text-lg"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          Search
        </Button>
      </div>
    </motion.form>
  );
};

export default HeroSearchInput;