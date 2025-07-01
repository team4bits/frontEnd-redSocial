import { getUsersNickNames } from "../get";



const largoMinimo = 2;
const usuarios = await getUsersNickNames();
const validarNickName = (nickname) => {
    console.log("Validando nickname:", nickname);
  if (nickname.length < largoMinimo || usuarios.includes(nickname)) {
    return false;
  }
  return true;
};
export default validarNickName;