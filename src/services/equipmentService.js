import apiService from './apiService';

const getFreeEquipment = async () => {
  try {
    const response = await apiService.get('/equipment');
    return response || [];
  } catch (error) {
    throw new Error("there is no available equipment.");
  }
}

const getEquipmentById = async (id) => {
  return apiService.get(`/equipment/${id}`);
}

const createEquipment = async (equipmentData) => {
  return apiService.post('/equipment', equipmentData);
}

const updateEquipment = async (id, equipmentData) => {
  return apiService.put(`/equipment/${id}`, equipmentData);
}

const deleteEquipment = async (id) => {
  return apiService.delete(`/equipment/${id}`);
}

const getAllEquipment = async () => {
  return apiService.get(`/equipment/free`);
}

const generateAIDescription = async (equipmentData) => {
  return apiService.post('/equipment/generate-description', equipmentData);
}

const updateQuantity = async (equipmentId, newQuantity) => {
  const response = await apiService.patch(`/equipment/${equipmentId}/quantity`, {
    quantity: newQuantity
  });
  return response.data;
};

export default {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getFreeEquipment,
  generateAIDescription,
  updateQuantity
};
