import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import * as propertyService from '../services/api/propertyService';
import * as savedPropertyService from '../services/api/savedPropertyService';

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Failed to load property');
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProperty = async () => {
    try {
      if (isSaved) {
        await savedPropertyService.delete(property.id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
          savedDate: new Date().toISOString(),
          notes: ''
        });
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update saved property');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-12">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Error Loading Property</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={loadProperty}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-2 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-12">
          <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-900 mb-2">Property Not Found</h3>
          <p className="text-surface-600 mb-4">The property you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-surface-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveProperty}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isSaved
                ? 'bg-accent text-white'
                : 'bg-white text-surface-600 border border-surface-300 hover:border-accent'
            }`}
          >
            <ApperIcon 
              name="Heart" 
              className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </motion.button>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-xl overflow-hidden group cursor-pointer">
              <img
                src={property.images[currentImageIndex]}
                alt={property.address}
                className="w-full h-full object-cover"
                onClick={() => setShowImageModal(true)}
              />
              
              {/* Navigation Arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ApperIcon name="ChevronLeft" className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ApperIcon name="ChevronRight" className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Image Count */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="space-y-4 overflow-y-auto max-h-96">
            {property.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-44 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                  index === currentImageIndex ? 'ring-2 ring-primary' : 'hover:opacity-75'
                }`}
              >
                <img
                  src={image}
                  alt={`${property.address} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                    +{property.images.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-semibold text-surface-900 mb-2">
                    {property.address}
                  </h1>
                  <div className="text-3xl font-display font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-4 sm:mt-0">
                  <span className="px-3 py-1 bg-surface-100 text-surface-700 rounded-lg text-sm">
                    {property.propertyType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Bed" className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-semibold text-surface-900">{property.bedrooms}</div>
                  <div className="text-sm text-surface-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Bath" className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl font-semibold text-surface-900">{property.bathrooms}</div>
                  <div className="text-sm text-surface-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Square" className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-semibold text-surface-900">{formatSquareFeet(property.squareFeet)}</div>
                  <div className="text-sm text-surface-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ApperIcon name="Calendar" className="w-6 h-6 text-info" />
                  </div>
                  <div className="text-2xl font-semibold text-surface-900">{property.yearBuilt}</div>
                  <div className="text-sm text-surface-600">Built</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-surface-900 mb-4">Description</h2>
              <p className="text-surface-600 leading-relaxed break-words">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-surface-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <ApperIcon name="Check" className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-surface-600 break-words">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-surface-600">Property Type</span>
                  <span className="text-surface-900 font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Year Built</span>
                  <span className="text-surface-900 font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Lot Size</span>
                  <span className="text-surface-900 font-medium">{formatSquareFeet(property.lotSize)} sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Listed</span>
                  <span className="text-surface-900 font-medium">
                    {new Date(property.listingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">Contact Agent</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full px-4 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                />
                <button
                  onClick={() => toast.success('Message sent successfully!')}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">Location</h3>
              <div className="w-full h-48 bg-surface-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="MapPin" className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                  <p className="text-surface-600 text-sm break-words">{property.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setShowImageModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.address}
                  className="max-w-full max-h-full object-contain"
                />
                <button
                  onClick={() => setShowImageModal(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ApperIcon name="ChevronLeft" className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ApperIcon name="ChevronRight" className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Property;