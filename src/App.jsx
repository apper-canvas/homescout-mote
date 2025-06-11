import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Property from './pages/Property';
import Saved from './pages/Saved';
import MapView from './pages/MapView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Properties />} />
            <Route path="property/:id" element={<Property />} />
            <Route path="saved" element={<Saved />} />
            <Route path="map" element={<MapView />} />
            <Route path="*" element={<NotFound />} />
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