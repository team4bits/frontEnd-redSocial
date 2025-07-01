import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NickNameInput, EmailInput, CheckBox } from "./FormRegistro-components";
import { useEffect, useState } from "react";
import { registrarUsuario } from "./functions/post/index";
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
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [invalido, setInvalido] = useState(true);



  const existeElNickname = () => { 
    if(usuarios.includes(nickname)) {
      return 'El nickname ya existe';
    }

  };
  const largoInvalido = () => { 
    if(nickname.length == 1) {
      return 'El nickname debe tener al menos 2 caracteres';
    }
    
  };

  //Validación en tiempo real
  useEffect(() => {
    //Verifica si el nickname ya existe en la lista de usuarios
    //Verifica que el largo del nickname sea mayor a 2

    setInvalido(existeElNickname()|| largoInvalido());
  }, [nickname, usuarios]);//Cuando el nickname o la lista de usuarios cambien, se ejecuta la validación


  return (
    <Form>
      <NickNameInput
        nickname={nickname}
        setNickname={setNickname}
        isInvalid={invalido}
        errorMessage={existeElNickname() || largoInvalido()}
      />
      <EmailInput email={email} onChange={setEmail} />
      <CheckBox />
      <Button variant="primary" type="submit" 
      onClick={
        (e)=> {
          e.preventDefault();
          registrarUsuario({
            "nickName": nickname,
            "email": email,
          });
        }
      }>
        Registrarse
      </Button>
    </Form>
  );
}

export default FormularioDeRegistro;
