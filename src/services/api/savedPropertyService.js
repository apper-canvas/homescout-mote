import { delay } from '../utils';

// Import mock data
import mockSavedProperties from '../mockData/savedProperties.json';

// Simulate API delay
const API_DELAY = 200;

let savedProperties = [...mockSavedProperties];

export const getAll = async () => {
  await delay(API_DELAY);
  return [...savedProperties];
};

export const getById = async (id) => {
  await delay(API_DELAY);
  const saved = savedProperties.find(s => s.propertyId === id);
  if (!saved) {
    throw new Error('Saved property not found');
  }
  return { ...saved };
};

export const create = async (savedData) => {
  await delay(API_DELAY);
  
  // Check if already saved
  const existing = savedProperties.find(s => s.propertyId === savedData.propertyId);
  if (existing) {
    throw new Error('Property already saved');
  }
  
  const newSaved = {
    ...savedData,
    id: Date.now().toString(),
    savedDate: new Date().toISOString()
  };
  
  savedProperties.push(newSaved);
  return { ...newSaved };
};

export const update = async (propertyId, savedData) => {
  await delay(API_DELAY);
  const index = savedProperties.findIndex(s => s.propertyId === propertyId);
  if (index === -1) {
    throw new Error('Saved property not found');
  }
  
  savedProperties[index] = { ...savedProperties[index], ...savedData };
  return { ...savedProperties[index] };
};

export const delete_ = async (propertyId) => {
  await delay(API_DELAY);
  const index = savedProperties.findIndex(s => s.propertyId === propertyId);
  if (index === -1) {
    throw new Error('Saved property not found');
  }
  
  const deleted = savedProperties.splice(index, 1)[0];
  return { ...deleted };
};

// Export as delete for consistency
export { delete_ as delete };