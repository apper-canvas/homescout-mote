import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const ErrorStateMessage = ({ title, message, onRetry, retryButtonText = 'Try Again', children }) => {
  return (
    <div className="text-center py-12">
      <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
      <Text as="h3" className="text-lg font-semibold text-surface-900 mb-2">{title}</Text>
      <Text as="p" className="text-surface-600 mb-4">{message}</Text>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {retryButtonText}
        </Button>
      )}
      {children}
    </div>
  );
};

export default ErrorStateMessage;