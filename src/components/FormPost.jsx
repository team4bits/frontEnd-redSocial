import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const FormPost = () => {
    const [content, setContent] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [tags, setTags] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    return (
        <Form>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                    <div>
                        <Card.Title className="text-light mb-1">Lionel Andrés Messi</Card.Title>
                        <Card.Subtitle className="text-secondary">18-12-2022 00:00 </Card.Subtitle>
                    </div>
                    <Button variant="outline-success" size="sm">
                        Agregar Tag
                    </Button>
                </Card.Header>
                <Card.Body className=" text-light">
                    <Form.Group controlId="formFile" className="mb-3" >
                        <Form.Control
                            className="bg-dark text-light text-justify"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <Form.Control
                        className="bg-dark text-light border-light text-justify"
                        type="text"
                        placeholder="¿Qué estás pensando publicar?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        data-bs-theme="dark"
                    />
                </Card.Body>

                <Card.Footer className='d-flex justify-content-center align-items-center gap-2 text-light p-3'>
                    <Button variant="primary">Publicar</Button>
                </Card.Footer>
            </Card>
        </Form>
    )
}

export default FormPost