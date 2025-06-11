import { toast } from 'react-toastify';

// Search Filter table fields from database schema
const ALL_FIELDS = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'min_price', 'max_price', 'min_beds', 'min_baths', 'property_types', 
  'location', 'radius'
];

// Only updateable fields for create/update operations
const UPDATEABLE_FIELDS = [
  'Name', 'Tags', 'Owner', 'min_price', 'max_price', 'min_beds', 'min_baths', 
  'property_types', 'location', 'radius'
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
          fieldName: "Name",
          SortType: "ASC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('search_filter', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching search filters:", error);
    toast.error("Failed to load search filters");
    return [];
  }
};

export const getById = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: ALL_FIELDS
    };
    
    const response = await apperClient.getRecordById('search_filter', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching search filter with ID ${id}:`, error);
    toast.error("Failed to load search filter");
    return null;
  }
};

export const create = async (filterData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter to only updateable fields and format data
    const filteredData = {};
    UPDATEABLE_FIELDS.forEach(field => {
      if (filterData[field] !== undefined) {
        // Convert arrays to comma-separated strings for property_types
        if (field === 'property_types' && Array.isArray(filterData[field])) {
          filteredData[field] = filterData[field].join(',');
        } else {
          filteredData[field] = filterData[field];
        }
      }
    });
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord('search_filter', params);
    
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
    
    throw new Error('Failed to create search filter');
  } catch (error) {
    console.error("Error creating search filter:", error);
    throw error;
  }
};

export const update = async (id, filterData) => {
  try {
    const apperClient = getApperClient();
    
    // Filter to only updateable fields
    const filteredData = { Id: parseInt(id) };
    UPDATEABLE_FIELDS.forEach(field => {
      if (filterData[field] !== undefined) {
        // Convert arrays to comma-separated strings for property_types
        if (field === 'property_types' && Array.isArray(filterData[field])) {
          filteredData[field] = filterData[field].join(',');
        } else {
          filteredData[field] = filterData[field];
        }
      }
    });
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord('search_filter', params);
    
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
    
    throw new Error('Failed to update search filter');
  } catch (error) {
    console.error("Error updating search filter:", error);
    throw error;
  }
};

export const delete_ = async (id) => {
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord('search_filter', params);
    
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
    console.error("Error deleting search filter:", error);
    throw error;
  }
};

// Export as delete for consistency
export { delete_ as delete };