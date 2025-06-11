import { delay } from '../utils';

// Import mock data
import mockProperties from '../mockData/properties.json';

// Simulate API delay
const API_DELAY = 300;

let properties = [...mockProperties];

export const getAll = async () => {
  await delay(API_DELAY);
  return [...properties];
};

export const getById = async (id) => {
  await delay(API_DELAY);
  const property = properties.find(p => p.id === id);
  if (!property) {
    throw new Error('Property not found');
  }
  return { ...property };
};

export const create = async (propertyData) => {
  await delay(API_DELAY);
  const newProperty = {
    ...propertyData,
    id: Date.now().toString(),
    listingDate: new Date().toISOString()
  };
  properties.push(newProperty);
  return { ...newProperty };
};

export const update = async (id, propertyData) => {
  await delay(API_DELAY);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Property not found');
  }
  
  properties[index] = { ...properties[index], ...propertyData };
  return { ...properties[index] };
};

export const delete_ = async (id) => {
  await delay(API_DELAY);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Property not found');
  }
  
  const deleted = properties.splice(index, 1)[0];
  return { ...deleted };
};

// Export as delete for consistency
export { delete_ as delete };