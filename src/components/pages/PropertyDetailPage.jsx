import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyDetailHeader from '@/components/organisms/PropertyDetailHeader';
import PropertyImageGallery from '@/components/organisms/PropertyImageGallery';
import PropertyOverview from '@/components/organisms/PropertyOverview';
import PropertyDescription from '@/components/organisms/PropertyDescription';
import PropertyFeatures from '@/components/organisms/PropertyFeatures';
import PropertyInfoSidebar from '@/components/organisms/PropertyInfoSidebar';
import ContactAgentForm from '@/components/organisms/ContactAgentForm';
import PropertyLocationMap from '@/components/organisms/PropertyLocationMap';
import ImageModal from '@/components/organisms/ImageModal';
import LoadingSkeleton from '@/components/organisms/LoadingSkeleton';
import ErrorStateMessage from '@/components/organisms/ErrorStateMessage';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import * as propertyService from '@/services/api/propertyService';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleImageGalleryClick = (index) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <ErrorStateMessage 
          title="Error Loading Property" 
          message={error} 
          onRetry={loadProperty} 
        >
          <Button
            onClick={() => navigate('/search')}
            className="mt-4 px-6 py-2 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors"
          >
            Back to Search
          </Button>
        </ErrorStateMessage>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center py-12">
          <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <Text as="h3" className="text-lg font-semibold text-surface-900 mb-2">Property Not Found</Text>
          <Text as="p" className="text-surface-600 mb-4">The property you're looking for doesn't exist or has been removed.</Text>
          <Button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-full overflow-hidden">
        <PropertyDetailHeader propertyId={property.id} />

        <PropertyImageGallery 
          images={property.images} 
          address={property.address} 
          onImageClick={handleImageGalleryClick} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyOverview property={property} />
            <PropertyDescription description={property.description} />
            <PropertyFeatures features={property.features} />
          </div>

          <div className="space-y-6">
            <PropertyInfoSidebar property={property} />
            <ContactAgentForm />
            <PropertyLocationMap address={property.address} />
          </div>
        </div>
      </div>

      <ImageModal 
        show={showImageModal} 
        images={property.images} 
        currentImageIndex={currentImageIndex} 
        onNext={nextImage} 
        onPrev={prevImage} 
        onClose={() => setShowImageModal(false)} 
      />
    </div>
  );
};

export default PropertyDetailPage;