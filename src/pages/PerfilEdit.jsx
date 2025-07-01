import { UserContext } from "../context/UserContext"
import { useContext } from "react";
import Form from 'react-bootstrap/Form';


export default function PerfilEdit() {
    const { user } = useContext(UserContext);

    return(<>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingrese su nombre de usuario" defaultValue={user.nickName} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" defaultValue={user.email} />
        </Form.Group>
    </>
    )
}