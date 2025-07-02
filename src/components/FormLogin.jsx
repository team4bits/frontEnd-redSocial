import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { NickNameInput, PasswordInput } from './FormLogin-components'
import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { UsuariosContext } from "../context/UsuariosContext";
import { useNavigate } from "react-router-dom";
import { getFunctions } from "./functions";
/*
    El formulario de Inicio de sesión permite a los usuarios ingresar:
        - Nombre de usuario
        - Contraseña default ("123456")
    Cuando el usuario ingresa el nombre de usuario conla contraseña correcta,
    se redirige a la página de inicio.
    Se modifica el useConext con los valores del usuario.
*/
const FormLogin = () => {
    const navigate = useNavigate(); // Hook para redirigir al usuario
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('123456'); // Contraseña default
    const [passwordInvalida, setPasswordInvalida] = useState(false);
    const [usuarioNoEncontrado, setUsuarioNoEncontrado] = useState(false);

    //Accedemos a la función setUser para guardar el usuario logueado
    const { setUser } = useContext(UserContext);
    //Accedemos a la lista de usuarios del contexto
    const {usuarios, actualizarUsuarios} = useContext(UsuariosContext);

    //Función al ejecutar el envio del formulario
    const handleLogin = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto
        setPasswordInvalida(false); // Resetea el estado de contraseña inválida
        setUsuarioNoEncontrado(false); // Resetea el estado de usuario no encontrado

        //Se valida que la contraseña sea la correcta
        if (password !== '123456') {
            console.error('Contraseña incorrecta');
            setPasswordInvalida(true);
            return;
        }
        //Se valida que el nickName exista en la lista de usuarios
        const usuarioEncontrado = usuarios.find(usuario => usuario.nickName === nickName);
        if (!usuarioEncontrado) {
            console.error('Usuario no encontrado');
            setUsuarioNoEncontrado(true);
            return;
        }
        try{
            console.log('Usuario encontrado:', usuarioEncontrado);
            const usuarioCompleto = await getFunctions.getUserByObjectId(usuarioEncontrado._id);
            setUser(usuarioCompleto);
            await actualizarUsuarios(); // Actualiza la lista de usuarios
            navigate('/');
        } catch (error) {
            console.error('Error al obtener el usuario completo:', error);
        }

    }

    return (
        <Form>
            <NickNameInput 
                nickname={nickName}
                setNickname={setNickName}
                isInvalid={usuarioNoEncontrado}
            />
            <PasswordInput
                password={password}
                setPassword={setPassword}
                isInvalid={passwordInvalida}
            />
            <Button 
            variant="primary" 
            type="submit" 
            onClick={handleLogin}
            >
               Iniciar sesión
            </Button>
        </Form>
    )
}
export default FormLogin;