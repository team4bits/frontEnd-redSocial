import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { NickNameInput, PasswordInput } from './FormLogin-components'
import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
/*
    El formulario de Inicio de sesión permite a los usuarios ingresar:
        - Nombre de usuario
        - Contraseña default ("123456")
    Cuando el usuario ingresa el nombre de usuario conla contraseña correcta,
    se redirige a la página de inicio.
    Se modifica el useConext con los valores del usuario.
*/
const FormLogin = ({usuarios}) => {
    const navigate = useNavigate(); // Hook para redirigir al usuario
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('123456'); // Contraseña default
    const [loginValido, setLoginValido] = useState(false);
    const [passwordInvalida, setPasswordInvalida] = useState(false);
    const [usuarioNoEncontrado, setUsuarioNoEncontrado] = useState(false);

    //Accedemos a la función setUser para guardar el usuario logueado
    const { setUser } = useContext(UserContext);

    //Función al ejecutar el envio del formulario
    const handleLogin = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto 
        //Se valida que la contraseña sea la correcta
        if (password !== '123456') {
            console.error('Contraseña incorrecta');
            setPasswordInvalida(true);
            return;
        }
        //Se valida que el nickName exista en la lista de usuarios
        if(usuarios.includes(nickName)){
            setLoginValido(true);
        }
        else {
            console.error('Usuario no encontrado');
            setUsuarioNoEncontrado(true);
            setLoginValido(false);
        }
        //Si el login es válido, se guarda el usuario en el contexto
        if(loginValido){
            const usuario = { nickName, password }; // Creamos un objeto usuario
            setUser(usuario); // Guardamos el usuario en el contexto
            console.log('Usuario logueado:', usuario);
            navigate('/'); // Redirigir a la página de inicio
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