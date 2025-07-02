import { API_URL, apiEndpoints } from '../../../config/api'; // Importa la URL de la API y los endpoints desde el archivo de configuración

export const getPostsFromUser = async (userId) => {

  try {
    const response = await fetch(`${API_URL}${apiEndpoints.postsByUser}/${userId}`); // Se usa la URL de la API y el endpoint de posts filtrando por userId
    if (!response.ok) {
      throw new Error(`Error al obtener los posts del usuario: ${response.statusText}`);
    }
    const posts = await response.json(); // Se obtiene la lista de posts del usuario
    return posts; // Retorna los posts del usuario
  } catch (error) {
    console.error(error);
    return []; // Retorna un array vacío en caso de error
  }
}

