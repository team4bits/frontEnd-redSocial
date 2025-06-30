import Form from 'react-bootstrap/Form';

const PasswordInput = () => {
    return (
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña default: 123456" />
        </Form.Group>
    );
};

export default PasswordInput;