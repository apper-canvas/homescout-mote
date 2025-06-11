import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import * as propertyService from '../services/api/propertyService';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    setLoading(true);
    try {
      const properties = await propertyService.getAll();
      // Get first 6 properties as featured
      setFeaturedProperties(properties.slice(0, 6));
    } catch (error) {
      console.error('Failed to load featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover the perfect property in your ideal location with our comprehensive search tools
            </p>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter location, address, or property type..."
                  className="w-full pl-12 pr-32 py-4 text-surface-900 bg-white rounded-xl border-0 focus:ring-2 focus:ring-white/50 transition-all duration-200 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* Quick Search Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {quickSearchOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/search?${option.query}`)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'Home', label: 'Properties Listed', value: '12,000+' },
              { icon: 'Users', label: 'Happy Customers', value: '8,500+' },
              { icon: 'MapPin', label: 'Cities Covered', value: '150+' },
              { icon: 'Award', label: 'Years Experience', value: '15+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-display font-semibold text-surface-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-surface-600 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-surface-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-surface-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties available now
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center space-x-2"
            >
              <span>View All Properties</span>
              <ApperIcon name="ArrowRight" className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-surface-900 mb-4">
              Why Choose HomeScout?
            </h2>
            <p className="text-surface-600 text-lg max-w-2xl mx-auto">
              Experience the future of home searching with our innovative features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-surface-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of satisfied customers who found their dream homes through HomeScout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/search')}
                className="px-8 py-3 bg-white text-secondary rounded-lg hover:bg-surface-50 transition-colors font-medium"
              >
                Start Searching
              </button>
              <button
                onClick={() => navigate('/map')}
                className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20"
              >
                Explore Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;