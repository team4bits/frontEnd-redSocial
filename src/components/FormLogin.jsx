import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { NickNameInput, PasswordInput } from './FormLogin-components'

/*
    El formulario de Inicio de sesión permite a los usuarios ingresar:
        - Nombre de usuario
        - Contraseña default ("123456")
    Cuando el usuario ingresa el nombre de usuario conla contraseña correcta,
    se redirige a la página de inicio.
    Se modifica el useConext con los valores del usuario.
*/
const FormLogin = () => {
    return (
        <Form>
            <NickNameInput />
            <PasswordInput />
            <Button variant="primary" type="submit" onClick={(e) => e.preventDefault()}>
                Iniciar sesión
            </Button>
        </Form>
    )
}
export default FormLogin;