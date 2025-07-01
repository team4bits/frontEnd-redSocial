import Form from 'react-bootstrap/Form';

const NickNameInput = ({ nickname, setNickname, isInvalid }) => {
    return(
        <>
        <Form.Group className="mb-3" controlId="formBasicNickName">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control 
                type="text" 
                isInvalid={isInvalid}
                placeholder="Ingresa tu nombre de usuario" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>
        </>
    )
}

export default NickNameInput;