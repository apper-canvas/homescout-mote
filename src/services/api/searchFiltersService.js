import { delay } from '../utils';

// Import mock data
import mockFilters from '../mockData/searchFilters.json';

// Simulate API delay
const API_DELAY = 100;

let filters = [...mockFilters];

export const getAll = async () => {
  await delay(API_DELAY);
  return [...filters];
};

export const getById = async (id) => {
  await delay(API_DELAY);
  const filter = filters.find(f => f.id === id);
  if (!filter) {
    throw new Error('Filter not found');
  }
  return { ...filter };
};

export const create = async (filterData) => {
  await delay(API_DELAY);
  const newFilter = {
    ...filterData,
    id: Date.now().toString()
  };
  filters.push(newFilter);
  return { ...newFilter };
};

export const update = async (id, filterData) => {
  await delay(API_DELAY);
  const index = filters.findIndex(f => f.id === id);
  if (index === -1) {
    throw new Error('Filter not found');
  }
  
  filters[index] = { ...filters[index], ...filterData };
  return { ...filters[index] };
};

export const delete_ = async (id) => {
  await delay(API_DELAY);
  const index = filters.findIndex(f => f.id === id);
  if (index === -1) {
    throw new Error('Filter not found');
  }
  
  const deleted = filters.splice(index, 1)[0];
  return { ...deleted };
};

// Export as delete for consistency
export { delete_ as delete };