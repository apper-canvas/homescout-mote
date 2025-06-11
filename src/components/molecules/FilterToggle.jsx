import React from 'react';
import Button from '@/components/atoms/Button';

const FilterToggle = ({ label, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
        isActive
          ? 'border-primary bg-primary text-white'
          : 'border-surface-200 bg-white text-surface-600 hover:border-primary'
      }`}
    >
      {label}
    </Button>
  );
};

export default FilterToggle;