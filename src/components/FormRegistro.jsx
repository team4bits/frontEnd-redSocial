import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
/*
    Formulario de registro para un nuevo usuario.
    Este formulario incluye campos para:
    - Nickname
    - Email
    - Contraseña
    - Confirmación de contraseña(Comentado hasta implementar en backend)
    - Aceptación de términos y condiciones
    - Botón de registro
*/
function FormularioDeRegistro() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicNickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control type="text" placeholder="Ingresa tu nickname" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu email" />
        <Form.Text className="text-muted">
          Nunca compartiremos tu email con nadie más.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresa tu contraseña" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Verificación de contraseña</Form.Label>
        <Form.Control type="password" placeholder="Confirma tu contraseña" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check 
          type="checkbox" 
          label="Acepto los términos y condiciones" 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
  );
}

export default FormularioDeRegistro;