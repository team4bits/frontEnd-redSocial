import { API_URL, apiEndpoints } from '../../../config/api';      // Importa la URL de la API y los endpoints desde el archivo de configuración

const getUsersEmails = async () => {
  /*
  * Función para obtener los emails de los usuarios registrados
  Se está usando una api con otro host
  Cambiar a localhost si es necesario
  */
  try {
    const response = await fetch(`${API_URL}${apiEndpoints.users}`); //Se usa la URL de la API y el endpoint de usuarios
    const data = await response.json(); //Se obiene a los usuarios con sus otros datos
    const usuarios = data.map((user) => user.email); //Se mapea para obtener solo los emails
    return usuarios;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUsersEmails;
