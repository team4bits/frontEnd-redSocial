import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { putFunctions, validators, getFunctions } from "../components/functions";
const usuariosExistentes = await getFunctions.getAllUsers();

export default function PerfilEdit() {
  const { user } = useContext(UserContext);
  const [nickName, setNickName] = useState(user.nickName);
  const [email, setEmail] = useState(user.email);
  // Validar nickName y email en tiempo real
  //Obtener la lista de usuarios existentes al momento
  const nickNamesExistentes = usuariosExistentes.map((usuario) => usuario.nickName);
  const emailsExistentes = usuariosExistentes.map((usuario) => usuario.email);
  const isvalidNickControl = (nickName.length >= 2 && !nickNamesExistentes.includes(nickName)) || nickName === user.nickName;
  const isvalidEmailControl = (validators.validarMail(email) && !emailsExistentes.includes(email)) || email === user.email;

  const modificarUsuario = async (e) => {
      e.preventDefault();
      const isEmailValid = (validators.validarMail(email) || email === user.email) && email !== "";
      const isNickNameValid = (validators.validarNickName(nickName) || nickName === user.nickName) && nickName !== "";
    //Enviar a putFunctions.modifcarUsuario el id del usuario y un body con los datos a modificar
    const id = user._id;
    const data = {
      nickName,
      email,
    };
    console.log(id);
    console.log(data);
    if(isEmailValid && isNickNameValid) {
      console.log("Datos válidos, enviando a modificarUsuario");
        try {
        const response = await putFunctions.modificarUsuario(id, data);
        console.log(response);
        } catch (error) {
        console.error("Error al modificar el usuario:", error);
        }
    } else {
      console.error("Datos inválidos");
      alert("Por favor, revise los datos ingresados.");
    }
  };

  return (
    <>
      <Form className="d-flex flex-column min-vh-100 bg-secondary text-light ">
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            isValid={isvalidNickControl}
            isInvalid={!isvalidNickControl && nickName.length > 0}
          />
            <Form.Control.Feedback type="valid"/>
            <Form.Control.Feedback type="invalid"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isvalidEmailControl}
            isInvalid={!isvalidEmailControl && email.length > 0}
          />
        </Form.Group>
        <Form.Control.Feedback type="valid"/>
        <Form.Control.Feedback type="invalid"/>
        <Button variant="primary" type="submit" onClick={modificarUsuario}>
          Guardar Cambios
        </Button>
      </Form>
    </>
  );
}
