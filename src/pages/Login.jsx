import React from "react";
import FormLogin from "../components/FormLogin";
import { getFunctions } from "../components/functions";
import logoImg from "../assets/ANTI-SOCIALNET.jpg";

const usuarios = await getFunctions.getUsersNickNames();

function Login() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-secondary text-light">
      <div className="container-fluid flex-grow-1">
        <div className="row h-100 min-vh-100">
          {/* Columna izquierda - Logo (solo en desktop) */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">
            <div className="text-center p-4">
              <img
                src={logoImg}
                alt="Logo de la red social"
                className="img-fluid mb-3 rounded"
                style={{ maxHeight: "300px", maxWidth: "100%" }}
              />
              <h2 className="text-primary mb-2">ANTI-SOCIALNET</h2>
              <p className="text-muted">Tu red social favorita</p>
            </div>
          </div>
          {/* Columna del formulario */}
          <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
            <div
              className="w-100 px-4 py-5 bg-dark rounded"
              style={{ maxWidth: "500px" }}
            >
              {/* Texto alternativo solo en móvil y tablet */}
              <div className="d-lg-none text-center mb-4">
                <h2 className="text-primary mb-2">ANTI-SOCIALNET</h2>
                <p className="text-light">Tu red social favorita</p>
              </div>
              <h1 className="text-center mb-3 h2">Inicia sesión</h1>
              <p className="text-center mb-4 text-light">
                ¡Gracias por ser parte de nuestra comunidad!
              </p>
              {/* Cargar el formulario de registro pasandole los usuarios registrados hasta el momento*/}
              <FormLogin usuarios={usuarios} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
