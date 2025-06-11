import Home from '../pages/Home';
import Properties from '../pages/Properties';
import Property from '../pages/Property';
import Saved from '../pages/Saved';
import MapView from '../pages/MapView';

export const routes = {
  home: {
    id: 'home',
    label: 'Search',
    path: '/',
    icon: 'Search',
    component: Home
  },
  properties: {
    id: 'properties',
    label: 'Properties',
    path: '/search',
    icon: 'Home',
    component: Properties
  },
  saved: {
    id: 'saved',
    label: 'Saved',
    path: '/saved',
    icon: 'Heart',
    component: Saved
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  }
};

export const routeArray = Object.values(routes);