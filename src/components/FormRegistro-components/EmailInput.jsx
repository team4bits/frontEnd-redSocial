import Form from 'react-bootstrap/Form';

const EmailInput = ({email, setEmail, isInvalid, errorMessage, isValid}) => {
    return <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email"
         placeholder="Ingresa tu email"
         value = {email}
         onChange={(e) => setEmail(e.target.value)}
         isInvalid={isInvalid}
         isValid={isValid}
         required       
         />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="valid"/>
        <Form.Text className="text-light">
          Nunca compartiremos tu email con nadie más.
        </Form.Text>
      </Form.Group>
}

export default EmailInput;