import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NickNameInput, EmailInput, CheckBox } from "./FormRegistro-components";
/*
    Formulario de registro para un nuevo usuario.
    Este formulario incluye campos para:
    - Nickname
    - Email
    - Aceptación de términos y condiciones
    - Botón de registro
*/
function FormularioDeRegistro(props) {
  // props.usuarios contiene la lista de usuarios registrados hasta el momento
  const { usuarios } = props;
  return (
    <Form>
      <NickNameInput usuarios= {usuarios}/>
      <EmailInput />
      <CheckBox />
      <Button variant="primary" type="submit" onClick={(e) => e.preventDefault()}>
        Registrarse
      </Button>
    </Form>
  );
}

export default FormularioDeRegistro;
