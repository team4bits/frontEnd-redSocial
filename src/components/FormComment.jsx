import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const FormComment = () => {
    const [content, setContent] = useState("");
    return (
        <Form>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-light text-dark" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                <Card.Header className='d-flex justify-content-between align-items-center text-dark gap-2'>
                    <div>
                        <Card.Title className="text-dark mb-1">Lionel Andrés Messi</Card.Title>
                        <Card.Subtitle className="text-secondary">18-12-2022 00:00 </Card.Subtitle>
                    </div>
                </Card.Header>
                <Card.Body className="">
                    <Form.Control
                        className="border-light text-justify"
                        type="text"
                        placeholder="¿Qué te gustaría comentar?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Card.Body>
                <Card.Footer className='d-flex justify-content-center align-items-center gap-2 text-light p-3'>
                    <Button variant="primary">Comentar</Button>
                </Card.Footer>
            </Card>
        </Form>
    )
}

export default FormComment;