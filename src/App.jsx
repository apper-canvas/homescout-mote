import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import HomePage from '@/components/pages/HomePage';
import PropertiesPage from '@/components/pages/PropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import SavedPropertiesPage from '@/components/pages/SavedPropertiesPage';
import MapViewPage from '@/components/pages/MapViewPage';
import NotFoundPage from '@/components/pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-50">
        <Routes>
          <Route path="/" element={<Layout />}>
<Route index element={<HomePage />} />
            <Route path="search" element={<PropertiesPage />} />
            <Route path="property/:id" element={<PropertyDetailPage />} />
            <Route path="saved" element={<SavedPropertiesPage />} />
            <Route path="map" element={<MapViewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
          toastClassName="rounded-lg shadow-lg"
          progressClassName="bg-primary"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;