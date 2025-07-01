import Form from 'react-bootstrap/Form';

const EmailInput = ({value, onChange}) => {
    return <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email"
         placeholder="Ingresa tu email"
         value = {value}
         onChange={(e) => onChange(e.target.value)}
         required       
         />
        <Form.Text className="text-light">
          Nunca compartiremos tu email con nadie más.
        </Form.Text>
      </Form.Group>
}

export default EmailInput;