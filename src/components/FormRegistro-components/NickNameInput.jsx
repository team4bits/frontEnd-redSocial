import Form from 'react-bootstrap/Form';

const NickNameInput = (props) => {
  // props.usuarios contiene la lista de usuarios registrados hasta el momento
  const { usuarios } = props;
  //Cuando el usuario salga del input, se puede validar si el nickname ya existe
  const handleBlur = (event) => {
    const nickname = event.target.value;
    const exists = usuarios.some(user => user.nickName === nickname);
    if (exists) {
      alert("El nickname ya está en uso. Por favor, elige otro.");
    }
  }
  return (
    <Form.Group className="mb-3" controlId="formBasicNickname">
      <Form.Label>Nickname</Form.Label>
      <Form.Control type="text" placeholder="Ingresa un nickname" onBlur={handleBlur} />
    </Form.Group>
  );
};

export default NickNameInput;