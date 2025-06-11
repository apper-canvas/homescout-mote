import React from 'react';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

const FormField = ({ label, type = 'text', placeholder, value, onChange, isTextArea = false, rows, className, ...props }) => {
  const inputClasses = "w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div>
      {label && (
        <Text as="label" className="block text-sm font-medium text-surface-700 mb-1">
          {label}
        </Text>
      )}
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
          className={`${inputClasses} resize-none ${className}`}
          {...props}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${inputClasses} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default FormField;