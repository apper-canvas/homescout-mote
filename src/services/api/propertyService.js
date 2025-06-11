import { toast } from 'react-toastify';

// Property table fields from database schema
const ALL_FIELDS = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'address', 'price', 'bedrooms', 'bathrooms', 'square_feet', 'property_type',
  'images', 'description', 'features', 'latitude', 'longitude', 'year_built',
  'lot_size', 'listing_date'
];

// Only updateable fields for create/update operations
const UPDATEABLE_FIELDS = [
  'Name', 'Tags', 'Owner', 'address', 'price', 'bedrooms', 'bathrooms', 
  'square_feet', 'property_type', 'images', 'description', 'features', 
  'latitude', 'longitude', 'year_built', 'lot_size', 'listing_date'
];

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const getAll = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: ALL_FIELDS,
      orderBy: [
        {
          fieldName: "listing_date",
          SortType: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    toast.error("Failed to load properties");
    return [];
  }
};

export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: ALL_FIELDS
    };
    
    const response = await apperClient.getRecordById('property', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    toast.error("Failed to load property");
    return null;
  }
};

export const create = async (propertyData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter to only updateable fields
    const filteredData = {};
    UPDATEABLE_FIELDS.forEach(field => {
      if (propertyData[field] !== undefined) {
        filteredData[field] = propertyData[field];
      }
    });
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord('property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} records:${failedRecords}`);
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      if (successfulRecords.length > 0) {
        return successfulRecords[0].data;
      }
    }
    
    throw new Error('Failed to create property');
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

export const update = async (id, propertyData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter to only updateable fields
    const filteredData = { Id: parseInt(id) };
    UPDATEABLE_FIELDS.forEach(field => {
      if (propertyData[field] !== undefined) {
        filteredData[field] = propertyData[field];
      }
    });
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord('property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            toast.error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) toast.error(record.message);
        });
      }
      
      if (successfulUpdates.length > 0) {
        return successfulUpdates[0].data;
      }
    }
    
    throw new Error('Failed to update property');
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

export const delete_ = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord('property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return false;
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} records:${failedDeletions}`);
        failedDeletions.forEach(record => {
          if (record.message) toast.error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
    
    return false;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// Export as delete for consistency
export { delete_ as delete };