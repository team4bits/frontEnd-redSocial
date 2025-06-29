import React from 'react'
//Importamos el componente del formulario de registro
import FormularioDeRegistro from '../components/FormRegistro'
import { getFunctions } from '../components/functions'

// Traer el JSON de la API con la lista de usuarios registrados
//Como prueba se utiliza un JSON local pero luego hay que reemplazar por la llamada a la API

const usuarios = await getFunctions.getUsersNickNames();
const Registro = () => {
  return (
    <div>
      <h1>Registro</h1>
      {/* Cargar el formulario de registro pasandole los usuarios registrados hasta el momento*/}
      <FormularioDeRegistro usuarios={usuarios} />
    </div>
  )
}

export default Registro