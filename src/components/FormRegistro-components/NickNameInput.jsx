import Form from "react-bootstrap/Form";

const NickNameInput = ({ nickname, setNickname, isInvalid, errorMessage }) => {
  const mensajeDeError = (errorMessage) => {
    if (errorMessage == 'El nickname ya existe'){
      return 'El nickname ya existe';
    }
    if (errorMessage == 'El nickname debe tener al menos 2 caracteres'){
      return 'El nickname debe tener al menos 2 caracteres';
    }
  }
  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicNickname">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          value={nickname}
          placeholder="Ingresa un nickname"
          onChange={(e) => setNickname(e.target.value)}
          isInvalid={isInvalid}
          required
        />
        <Form.Control.Feedback type="invalid">
          {mensajeDeError(errorMessage)}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default NickNameInput;
