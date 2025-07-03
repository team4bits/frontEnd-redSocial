import { API_URL, apiEndpoints } from '../../../config/api'; // Importa la URL de la API y los endpoints desde el archivo de configuración

export const getAUser = async (userId) => {
  /*
  * Función para obtener un usuario por su ID
  */
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.users}/${userId}`); // Se usa la URL de la API y el endpoint de usuarios con el ID específico
    if (!response.ok) {
      throw new Error(`Error al obtener el usuario: ${response.statusText}`);
    }
    const user = await response.json(); // Se obtiene el usuario con sus otros datos
    return user; // Retorna el usuario completo
  } catch (error) {
    console.error(error);
    return null; // Retorna null en caso de error
  }
}
