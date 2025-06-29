import Form from 'react-bootstrap/Form';

const NickNameInput = () => {
    return(
        <Form.Group className="mb-3" controlId="formBasicNickName">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" />
        </Form.Group>
    )
}

export default NickNameInput;