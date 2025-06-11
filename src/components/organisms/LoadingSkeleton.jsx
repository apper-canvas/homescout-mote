import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="h-48 bg-surface-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 bg-surface-200 rounded animate-pulse" />
              <div className="h-4 bg-surface-200 rounded w-3/4 animate-pulse" />
              <div className="flex space-x-4">
                <div className="h-4 bg-surface-200 rounded w-16 animate-pulse" />
                <div className="h-4 bg-surface-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-surface-200 rounded w-32" />
          <div className="h-10 bg-surface-200 rounded w-24" />
        </div>
        
        {/* Image Gallery Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 h-96 bg-surface-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-44 bg-surface-200 rounded-xl" />
            <div className="h-44 bg-surface-200 rounded-xl" />
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-surface-200 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-surface-200 rounded" />
              <div className="h-4 bg-surface-200 rounded w-5/6" />
              <div className="h-4 bg-surface-200 rounded w-4/6" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-surface-200 rounded w-32" />
            <div className="space-y-2">
              <div className="h-4 bg-surface-200 rounded" />
              <div className="h-4 bg-surface-200 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'map-sidebar') {
    return (
      <div className="h-screen flex">
        <div className="flex-1 bg-surface-200 animate-pulse" />
        <div className="w-96 bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div className="h-6 bg-surface-200 rounded animate-pulse" />
            <div className="h-4 bg-surface-200 rounded w-3/4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-surface-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;