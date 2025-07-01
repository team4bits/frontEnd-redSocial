import { UserContext } from "../context/UserContext"
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { putFunctions } from "../components/functions";


export default function PerfilEdit() {
    const { user } = useContext(UserContext);
    const [nickName, setNickName] = useState(user.nickName);
    const [email, setEmail] = useState(user.email);

    const modificarUsuario = async (e) => {
        e.preventDefault();
        //Enviar a putFunctions.modifcarUsuario el id del usuario y un body con los datos a modificar
        const id = user._id;
        const data = {
            nickName,
            email
        };
        console.log(id)
        console.log(data)
        try {
            const response = await putFunctions.modificarUsuario(id, data);
            console.log(response);
        }
        catch (error) {
            console.error('Error al modificar el usuario:', error);
        }
    }

    return(<>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text"
             placeholder="Ingrese su nombre de usuario" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={modificarUsuario}>
            Guardar Cambios
        </Button>
    </>
    )
}