import { API_URL, apiEndpoints } from '../../../config/api'
import {validarMail, validarNickName} from '../validators';
const registrarUsuario = async (bodyUsuario) => {
    //Función para registrar un usuario
    //Es llamada desde un boton y debe recibir un objeto con los datos del usuario
    //Se elimina el preventDefault del boton
    console.log("Registrando usuario:", bodyUsuario);
    //Se espera que el bodyUsuario tenga la siguiente estructura:
    // {
    //   "nickName": "string", Un string de al menos 2 caracteres
    //   "email": "string" Un email valido
    console.log(`El email es valido = ${ await validarMail(bodyUsuario.email)}`);
    console.log(`El nickName es valido = ${ await validarNickName(bodyUsuario.nickName)}`);
    if(await validarMail(bodyUsuario.email) &&  validarNickName(bodyUsuario.nickName)) {
        console.log("Usuario válido, procediendo a registrar...");
        try {
        let respuesta = await fetch (`${API_URL}${apiEndpoints.users}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(bodyUsuario)
        });
        if (!respuesta.ok) {
            throw new Error(`Error al registrar usuario: ${respuesta.statusText}`);
        }
        const data = await respuesta.json();
        console.log("Usuario registrado:", data);
        return data;
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
    }
    
    } else {
        console.error("Datos invalidos, no se puede registrar.");
        return null;
    }
    
}

export default registrarUsuario;