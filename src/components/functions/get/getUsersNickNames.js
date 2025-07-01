const URL_API = import.meta.env.VITE_API_URL || "http://localhost";
const URL_API_PORT = import.meta.env.VITE_API_PORT || "3001";

const getUsersNickNames = async () => {
  /*
  * Función para obtener los nicknames de los usuarios registrados
  Se está usando una api con otro host
  Cambiar a localhost si es necesario
  */
  try {
    const response = await fetch(`${URL_API}:${URL_API_PORT}/users`);
    const data = await response.json(); //Se obiene a los usuarios con sus otros datos
    const usuarios = data.map((user) => user.nickName); //Se mapea para obtener solo los nickname
    return usuarios;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUsersNickNames;
