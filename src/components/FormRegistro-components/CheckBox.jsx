import Form from 'react-bootstrap/Form';
//Componente checkBox genérico
const CheckBox = ({ checked, onChange }) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
                type="checkbox"
                label="Acepto los términos y condiciones"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
        </Form.Group>
    );
}
export default CheckBox;