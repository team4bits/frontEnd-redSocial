import { API_URL, apiEndpoints } from '../../../config/api';

export const getAllTags = async () => {
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.tags}`);
    if (!response.ok) throw new Error('Error al cargar tags');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};