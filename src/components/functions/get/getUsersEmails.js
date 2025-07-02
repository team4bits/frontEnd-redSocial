import {getAllUsers} from './getAllUsers'
const getUsersEmails = async () => {
  /*
  * Función para obtener los emails de los usuarios registrados
  Se está usando una api con otro host
  Cambiar a localhost si es necesario
  */
  try {
    const data = await getAllUsers(); //Se obiene a los usuarios con sus otros datos
    const usuarios = data.map((user) => user.email); //Se mapea para obtener solo los emails
    return usuarios;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUsersEmails;
