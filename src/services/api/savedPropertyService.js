import { toast } from 'react-toastify';

// Saved Property table fields from database schema
const ALL_FIELDS = [
  'Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy',
  'saved_date', 'notes', 'property_id'
];

// Only updateable fields for create/update operations
const UPDATEABLE_FIELDS = [
  'Name', 'Tags', 'Owner', 'saved_date', 'notes', 'property_id'
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
          fieldName: "saved_date",
          SortType: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('saved_property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    toast.error("Failed to load saved properties");
    return [];
  }
};

export const getById = async (propertyId) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: ALL_FIELDS,
      where: [
        {
          fieldName: "property_id",
          operator: "ExactMatch",
          values: [parseInt(propertyId)]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('saved_property', params);
    
    if (!response.success) {
      console.error(response.message);
      toast.error(response.message);
      return null;
    }
    
    const savedProperties = response.data || [];
    if (savedProperties.length === 0) {
      throw new Error('Saved property not found');
    }
    
    return savedProperties[0];
  } catch (error) {
    console.error(`Error fetching saved property for property ID ${propertyId}:`, error);
    return null;
  }
};

export const create = async (savedData) => {
  try {
    const apperClient = getApperClient();
    
    // Check if already saved
    const existing = await getById(savedData.property_id);
    if (existing) {
      throw new Error('Property already saved');
    }
    
    // Filter to only updateable fields and format data
    const filteredData = {};
    UPDATEABLE_FIELDS.forEach(field => {
      if (savedData[field] !== undefined) {
        filteredData[field] = savedData[field];
      }
    });
    
    // Ensure property_id is integer and add current date if not provided
    if (filteredData.property_id) {
      filteredData.property_id = parseInt(filteredData.property_id);
    }
    if (!filteredData.saved_date) {
      filteredData.saved_date = new Date().toISOString();
    }
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.createRecord('saved_property', params);
    
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
    
    throw new Error('Failed to save property');
  } catch (error) {
    console.error("Error creating saved property:", error);
    throw error;
  }
};

export const update = async (propertyId, savedData) => {
  try {
    const existing = await getById(propertyId);
    if (!existing) {
      throw new Error('Saved property not found');
    }
    
    const apperClient = getApperClient();
    
    // Filter to only updateable fields
    const filteredData = { Id: existing.Id };
    UPDATEABLE_FIELDS.forEach(field => {
      if (savedData[field] !== undefined) {
        filteredData[field] = savedData[field];
      }
    });
    
    const params = {
      records: [filteredData]
    };
    
    const response = await apperClient.updateRecord('saved_property', params);
    
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
    
    throw new Error('Failed to update saved property');
  } catch (error) {
    console.error("Error updating saved property:", error);
    throw error;
  }
};

export const delete_ = async (propertyId) => {
  try {
    const existing = await getById(propertyId);
    if (!existing) {
      throw new Error('Saved property not found');
    }
    
    const apperClient = getApperClient();
    const params = {
      RecordIds: [existing.Id]
    };
    
    const response = await apperClient.deleteRecord('saved_property', params);
    
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
    console.error("Error deleting saved property:", error);
    throw error;
  }
};

// Export as delete for consistency
export { delete_ as delete };