import Form from 'react-bootstrap/Form';

const EmailInput = () => {
    return <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu email" />
        <Form.Text className="text-muted">
          Nunca compartiremos tu email con nadie más.
        </Form.Text>
      </Form.Group>
}

export default EmailInput;