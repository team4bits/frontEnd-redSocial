import Form from 'react-bootstrap/Form';

const PasswordInput = ({password, setPassword, isInvalid}) => {
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                type="password" 
                isInvalid={isInvalid}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
            </Form.Control.Feedback>
        </>
    );
};

export default PasswordInput;