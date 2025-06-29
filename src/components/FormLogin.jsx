import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

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
            <Form.Group className="mb-3" controlId="formBasicNickName">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña default: 123456" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => e.preventDefault()}>
                Iniciar sesión
            </Button>
        </Form>
    )
}

export default FormLogin;