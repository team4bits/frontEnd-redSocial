import { UserContext } from "../context/UserContext";
import { UsuariosContext } from "../context/UsuariosContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import {
  putFunctions,
  validators,
  deleteFunctions,
} from "../components/functions";

export default function PerfilEdit() {
  const { user, setUser } = useContext(UserContext);
  const { usuarios, actualizarUsuarios } = useContext(UsuariosContext);
  const [nickName, setNickName] = useState(user.nickName);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();
  // Validar nickName y email en tiempo real
  //Obtener la lista de usuarios existentes al momento
  const nickNamesExistentes = usuarios.map((usuario) => usuario.nickName);
  const emailsExistentes = usuarios.map((usuario) => usuario.email);
  const nickNameIgual = nickName === user.nickName;
  const emailIgual = email === user.email;
  const isvalidNickControl =
    (nickName.length >= 2 && !nickNamesExistentes.includes(nickName)) ||
    nickNameIgual;
  const isvalidEmailControl =
    (validators.validarMail(email) && !emailsExistentes.includes(email)) ||
    emailIgual;
  const disabledButtonGuardarCambios =
    !isvalidNickControl ||
    !isvalidEmailControl ||
    nickName === "" ||
    email === "" ||
    (nickNameIgual &&
    emailIgual);
  const modificarUsuario = async (e) => {
    e.preventDefault();
    const isEmailValid =
      (validators.validarMail(email) || email === user.email) && email !== "";
    const isNickNameValid =
      (validators.validarNickName(nickName) || nickName === user.nickName) &&
      nickName !== "";
    //Enviar a putFunctions.modifcarUsuario el id del usuario y un body con los datos a modificar
    const id = user._id;
    const data = {
      nickName,
      email,
    };
    console.log(id);
    console.log(data);
    if (isEmailValid && isNickNameValid) {
      console.log("Datos válidos, enviando a modificarUsuario");
      try {
        const response = await putFunctions.modificarUsuario(id, data);
        //Actualizar la lista de usuarios en el contexto
        await actualizarUsuarios();
        //Actualizar el usuario en el contexto
        setUser((prevUser) => ({
          ...prevUser,
          nickName: data.nickName,
          email: data.email,
        }));
        //Redirigir al perfil
        alert("Usuario modificado correctamente");
        navigate("/perfil");
        console.log(response);
      } catch (error) {
        console.error("Error al modificar el usuario:", error);
      }
    } else {
      console.error("Datos inválidos");
      alert("Por favor, revise los datos ingresados.");
    }
  };
  const eliminarCuenta = async (e) => {
    e.preventDefault();
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (confirmacion) {
      //Si se confira se procede a la eliminación
      //Se saca el usuario del contexto
      setUser(null);
      //Se redirige a la página de inicio
      navigate("/"); //Se elimina el usuario de la base de datos
      await deleteFunctions.deleteUser(user._id); //Se elimina el usuario
      //Se actualiza la lista de usuarios en el contexto
      await actualizarUsuarios();
    }
  };
  return (
    <div className="d-flex flex-column min-vh-100 bg-secondary text-light">
      <div className="container-fluid flex-grow-1">
        <div className="row h-100 min-vh-100">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div
              className="w-100 px-4 py-5 bg-dark rounded"
              style={{ maxWidth: "500px" }}
            >
              {/* Encabezado del formulario */}
              <div className="text-center mb-4">
                <h2 className="text-primary mb-2">ANTI-SOCIALNET</h2>
                <p className="text-light">Tu red social favorita</p>
              </div>

              <h1 className="text-center mb-3 h2">Editar Perfil</h1>
              <p className="text-center mb-4 text-light">
                Actualiza tu información personal
              </p>

              {/* Formulario */}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicNickname">
                  <Form.Label className="text-light">
                    Nombre de Usuario
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre de usuario"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    isValid={isvalidNickControl}
                    isInvalid={!isvalidNickControl && nickName.length > 0}
                  />
                  <Form.Control.Feedback type="valid" />
                  <Form.Control.Feedback type="invalid">
                    El nombre debe tener al menos 2 caracteres y no estar en uso
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className="text-light">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isValid={isvalidEmailControl}
                    isInvalid={!isvalidEmailControl && email.length > 0}
                  />
                  <Form.Control.Feedback type="valid" />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese un email válido y que no esté en uso
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Botones */}
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={modificarUsuario}
                    disabled={disabledButtonGuardarCambios}
                  >
                    Guardar Cambios
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="lg"
                    onClick={eliminarCuenta}
                    className="mt-3"
                  >
                    Eliminar Cuenta
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
