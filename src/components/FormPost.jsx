import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API_URL, apiEndpoints } from '../config/api';
import FormTag from './FormTag';

const FormPost = ({ user, onPostCreado }) => {
    const [content, setContent] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [tags, setTags] = useState([]);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content && imagenes.length === 0) {
            alert("Debes escribir algo o subir una imagen.");
            return;
        }

        try {
            const nuevoPost = {
                userId: user._id,
                content,
                fecha: currentTime.toISOString()
            };
            console.log("Payload del post:", nuevoPost);
            const responsePost = await fetch(`${API_URL}${apiEndpoints.posts}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoPost)
            });

            if (!responsePost.ok) throw new Error("Error al crear el post");

            const postCreado = await responsePost.json();

            if (imagenes.length > 0) {
                const formData = new FormData();
                formData.append("postId", postCreado._id);
                imagenes.forEach((img) => {
                    formData.append("imagenes", img);
                });

                const responseArchivos = await fetch(`${API_URL}${apiEndpoints.archives}`, {
                    method: "POST",
                    body: formData
                });

                if (!responseArchivos.ok) {
                    throw new Error("Error al subir imágenes");
                }
                await responseArchivos.json();
            }

            alert("¡Publicación realizada con éxito!");
            setContent("");
            setImagenes([]);
            setTags([]);
            window.dispatchEvent(new Event("nuevo-post-creado"));
        } catch (error) {
            console.error("Error al publicar:", error);
            alert("Ocurrió un error al intentar publicar.");
        }
    };

    return (<>
        <Form onSubmit={handleSubmit}>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                {/* ✅ Card.Header RESPONSIVE */}
                <Card.Header className='text-light p-3'>
                    <Row className="align-items-center g-2">
                        {/* Información del usuario - Ocupa más espacio en mobile */}
                        <Col xs={12} sm={8} md={9}>
                            <div>
                                <Card.Title className="text-light mb-1 fs-6 fs-sm-5">
                                    @{user.nickName}
                                </Card.Title>
                                <Card.Subtitle className="text-secondary small">
                                    {currentTime.toLocaleString(undefined, {
                                        dateStyle: 'short',
                                        timeStyle: 'short'
                                    })}
                                </Card.Subtitle>
                            </div>
                        </Col>
                        
                        {/* Botón - Se adapta al espacio disponible */}
                        <Col xs={12} sm={4} md={3}>
                            <div className="d-grid d-sm-block text-sm-end">
                                <Button 
                                    variant="outline-success" 
                                    size="sm" 
                                    onClick={agregarTag}
                                    className="w-100 w-sm-auto"
                                >
                                    {/* Texto adaptivo según el tamaño de pantalla */}
                                    <span className="d-none d-md-inline">Agregar Tag</span>
                                    <span className="d-md-none">+ Tag</span>
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Mostrar tags seleccionados si existen */}
                    {tags && tags.length > 0 && (
                        <Row className="mt-3">
                            <Col xs={12}>
                                <div className="d-flex flex-wrap gap-1 align-items-center">
                                    <small className="text-muted me-2">Tags:</small>
                                    {tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="badge bg-success"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Card.Header>

                <Card.Body className="text-light">
                    <Form.Group controlId="formFile" className="mb-3">
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
                    <Button variant="primary" type="submit">Publicar</Button>
                </Card.Footer>
            </Card>
        </Form>

        {/* Modal de Tags */}
        <FormTag
            show={showTagModal}
            onHide={cerrarTagModal}
        />
    </>
    );
};

export default FormPost;