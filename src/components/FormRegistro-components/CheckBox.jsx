import Form from 'react-bootstrap/Form';
//Componente checkBox genérico
const CheckBox = () => {
    return (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
                type="checkbox"
                label="Acepto los términos y condiciones"
            />
        </Form.Group>
    );
}
export default CheckBox;