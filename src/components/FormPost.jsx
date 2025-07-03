import { Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FormTag from './FormTag';

const FormPost = ({user}) => {
    const [content, setContent] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showTagModal, setShowTagModal] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    const agregarTag = () => {
        setShowTagModal(true);
    };

    const cerrarTagModal = () => {
        setShowTagModal(false);
    };

    // Función para obtener el nombre de usuario
    const getUserName = () => {
        if (!user) return 'Usuario';
        if (typeof user.nickName === 'string') return user.nickName;
        if (user.nickName && typeof user.nickName === 'object') {
            return user.nickName.nameTag || user.nickName.name || 'Usuario';
        }
        return user.name || user.username || 'Usuario';
    };

    return (
        <>
            <Form>
                <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                    <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                        <div>
                            <Card.Title className="text-light mb-1">@{getUserName()}</Card.Title>
                            <Card.Subtitle className="text-secondary">
                                {currentTime.toLocaleString(undefined, { 
                                    dateStyle: 'short',
                                    timeStyle: 'short'
                                })}
                            </Card.Subtitle>
                        </div>
                        <Button variant="outline-success" size="sm" onClick={agregarTag}>
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

            {/* Modal de Tags */}
            <FormTag 
                show={showTagModal} 
                onHide={cerrarTagModal}
            />
        </>
    )
}

export default FormPost;