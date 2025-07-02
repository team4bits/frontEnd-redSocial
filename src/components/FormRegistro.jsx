import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NickNameInput, EmailInput, CheckBox } from "./FormRegistro-components";
import { useEffect, useState, useContext } from "react";
import { postFunctions } from "./functions";
import { useNavigate } from "react-router-dom";
import {UsuariosContext} from '../context/UsuariosContext';
/*
    Formulario de registro para un nuevo usuario.
    Este formulario incluye campos para:
    - Nickname
    - Email
    - Aceptación de términos y condiciones
    - Botón de registro
*/
function FormularioDeRegistro({emails}) {
  // props.usuarios contiene la lista de usuarios registrados hasta el momento
  const {usuarios, agregarUsuario} = useContext(UsuariosContext);
  const [nickname, setNickname] = useState("");
  const [nickInvalido, setNickInvalido] = useState(true);
  const [email, setEmail] = useState("");
  const [emailInvalido, setEmailInvalido] = useState(true);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const navigate = useNavigate();
  
  //Validaciones para nickname
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
  //validaciones para email
  const existeElEmail = () => {
    if(emails.includes(email)) {
      return 'El email ya está registrado';
    }
  };
  const estructuraDeEmailInvalida = () => {
    if(!/\S+@\S+\.\S+/.test(email)) {
      return 'El email debe tener un formato válido';
    }
  }
  //Validación en tiempo real
  useEffect(() => {
    //Verifica si el nickname ya existe en la lista de usuarios
    //Verifica que el largo del nickname sea mayor a 2
    setNickInvalido(existeElNickname()|| largoInvalido());
  }, [nickname, usuarios]);//Cuando el nickname o la lista de usuarios cambien, se ejecuta la validación

  useEffect(() => {
    //Verifica si el email ya existe en la lista de emails
    //Verifica que el email tenga un formato válido
    setEmailInvalido(existeElEmail() || estructuraDeEmailInvalida());
  }, [email, emails]);//Cuando el email o la lista de emails cambien, se ejecuta la validación


  const handleSubmit = async (e) => {
          e.preventDefault();
          if (!aceptoTerminos) {
            alert("Debes aceptar los términos y condiciones");
            return;
          }
          if (!nickInvalido && !emailInvalido) {
            //Registrar al usuario
            const respuesta = await postFunctions.registrarUsuario({
              nickName: nickname,
              email: email,
            });
            console.log('la respuesta es ' + respuesta)
            //Redirigir a la página de login
            agregarUsuario(respuesta);
            alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
            setNickname("");
            setEmail("");
            setAceptoTerminos(false)
            navigate('/login'); // Redirige a la página de login
          } else {
            alert("Debe completar el formulario correctamente.");
          }
        }

  return (
    <Form>
      <NickNameInput
        nickname={nickname}
        setNickname={setNickname}
        isInvalid={nickInvalido}
        errorMessage={existeElNickname() || largoInvalido()}
        isValid={nickname !== "" && !nickInvalido} // El nickname es válido si no está vacío y no es inválido
      />
      <EmailInput 
        email={email} 
        setEmail={setEmail}
        isInvalid={emailInvalido && email !== ""} // El email es inválido si no cumple las validaciones y no está vacío
        errorMessage={existeElEmail() || estructuraDeEmailInvalida()}
        isValid={email !== "" && !emailInvalido} // El email es válido si no está vacío y no es inválido
      />
      <CheckBox checked={aceptoTerminos} onChange={setAceptoTerminos} />
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Registrarse
      </Button>
    </Form>
  );
}

export default FormularioDeRegistro;
