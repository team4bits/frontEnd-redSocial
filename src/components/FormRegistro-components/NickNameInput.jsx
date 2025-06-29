import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const NickNameInput = (props) => {
  // props.usuarios contiene la lista de usuarios registrados hasta el momento
  const { usuarios } = props;
  const [nickName, setNickName] = useState("");
  const setNickname = (e) => {
    // Aquí se puede agregar la lógica para validar el nickname
    // Por ejemplo, verificar si ya existe en la lista de usuarios
    const nicknameValue = e.target.value;
    setNickName(nicknameValue);
    if (usuarios.includes(nicknameValue)) {
      console.warn("El nickname ya existe");
    } else {
      console.log("Nickname válido");
    }
  };

  //Cuando el usuario salga del input, se puede validar si el nickname ya existe
  return (<>
    <Form.Group className="mb-3" controlId="formBasicNickname">
      <Form.Label>Nickname</Form.Label>
      <Form.Control type="text" placeholder="Ingresa un nickname" onChange={setNickname} />
      <p>
        {usuarios.includes(nickName) ? (
          <span style={{ color: 'red' }}>El nickname ya existe</span>
        ) : (<><span style={{ color: 'green' }}>Nickname disponible</span></>)
        }</p>
    </Form.Group>
    </>
  );
};

export default NickNameInput;