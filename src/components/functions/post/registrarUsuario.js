const URL_API = import.meta.env.VITE_API_URL || 'http://localhost';
const URL_API_PORT = import.meta.env.VITE_API_PORT || '3001';

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
    if(validarMail(bodyUsuario.email) && validarNickName(bodyUsuario.nickName)) {
        console.log("Usuario válido, procediendo a registrar...");
        try {

        let respuesta = await fetch (`${URL_API}:${URL_API_PORT}/users`, {
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
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
    }
    return bodyUsuario;
    } else {
        console.error("Datos invalidos, no se puede registrar.");
        return null;
    }
    
}

export default registrarUsuario;