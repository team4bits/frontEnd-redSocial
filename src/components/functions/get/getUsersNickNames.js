import  {getAllUsers}  from './getAllUsers';
const getUsersNickNames = async () => {
  /*
  * Función para obtener los nicknames de los usuarios registrados
  Se está usando una api con otro host
  Cambiar a localhost si es necesario
  */
  try {
    const data = await getAllUsers(); //Se obiene a los usuarios con sus otros datos
    const usuarios = data.map((user) => user.nickName); //Se mapea para obtener solo los nickname
    return usuarios;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUsersNickNames;
