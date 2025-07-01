import { getFunctions } from "../index";

const largoMinimo = 2;
const validarNickName = async (nickname) => {
  const usuarios = await getFunctions.getUsersNickNames();
  if (nickname.length < largoMinimo || usuarios.includes(nickname)) {
    return false;
  }
  return true;
};
export default validarNickName;