import { getFunctions } from "../";



const largoMinimo = 2;
const usuarios = await getFunctions.getUsersNickNames();
const validarNickName = (nickname) => {
  if (nickname.length < largoMinimo || usuarios.includes(nickname)) {
    return false;
  }
  return true;
};
export default validarNickName;