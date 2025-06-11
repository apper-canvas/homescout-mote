import HomePage from '@/components/pages/HomePage';
import PropertiesPage from '@/components/pages/PropertiesPage';
import PropertyDetailPage from '@/components/pages/PropertyDetailPage';
import SavedPropertiesPage from '@/components/pages/SavedPropertiesPage';
import MapViewPage from '@/components/pages/MapViewPage';

export const routes = {
  home: {
    id: 'home',
    label: 'Search',
    path: '/',
    icon: 'Search',
component: HomePage
  },
  properties: {
    id: 'properties',
    label: 'Properties',
    path: '/search',
    icon: 'Home',
component: PropertiesPage
  },
  saved: {
    id: 'saved',
    label: 'Saved',
    path: '/saved',
    icon: 'Heart',
component: SavedPropertiesPage
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
component: MapViewPage
  }
};

export const routeArray = Object.values(routes);