import {getFunctions} from '../'

//Se fija que el mail que se recibe no esté ya registrado
const validarEmailDisponible = async (email) => {
  //Se obtiene la lista de emails registrados
  const emailsRegistrados = await getFunctions.getUsersEmails();
  //Se comprueba si el email ya está registrado
  if(!emailsRegistrados.includes(email)) {
    return true;
  }
  return false;
};


//Funcion que valida la estructura de un email
const validarEstructuraMail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


//Función que indica si el mail es válido
const validarMail = async (email) => {
  return await validarEmailDisponible(email) && validarEstructuraMail(email);
};
export default validarMail;
