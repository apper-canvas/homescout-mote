import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 2 },
              y: { repeat: Infinity, duration: 3 }
            }}
            className="mb-8"
          >
            <ApperIcon name="Home" className="w-24 h-24 text-surface-300 mx-auto" />
          </motion.div>
          
          <h1 className="text-6xl font-display font-bold text-surface-900 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-surface-700 mb-4">
            Property Not Found
          </h2>
          
          <p className="text-surface-500 mb-8 leading-relaxed">
            The page you're looking for seems to have moved or doesn't exist. 
            Let's help you find your dream home instead.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium inline-flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Home" className="w-4 h-4" />
              <span>Go Home</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors font-medium inline-flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Search" className="w-4 h-4" />
              <span>Search Properties</span>
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-surface-400 mb-4">
              Popular searches:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Houses under $500K', '3+ bedrooms', 'Condos', 'New listings'].map((term, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                  className="px-3 py-1 bg-surface-100 text-surface-600 rounded-full text-sm hover:bg-surface-200 transition-colors"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;