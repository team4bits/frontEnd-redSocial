import { Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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
            const responsePost = await fetch("http://localhost:3001/posts", {
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

                const responseArchivos = await fetch("http://localhost:3001/archives", {
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

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Card 
                    className="mx-auto my-5 bg-dark text-light" 
                    style={{ 
                        minHeight: '10rem', 
                        width: '100%',
                        maxWidth: 'min(90vw, 800px)' // Responsive sin clases Bootstrap
                    }}
                >
                    {/* ✅ Card.Header con Flexbox */}
                    <Card.Header className='text-light p-3'>
                        {/* Contenedor principal - Responsive con Flexbox */}
                        <div 
                            className="d-flex gap-3"
                            style={{
                                flexDirection: window.innerWidth < 576 ? 'column' : 'row',
                                alignItems: window.innerWidth < 576 ? 'stretch' : 'center'
                            }}
                        >
                            {/* Información del usuario */}
                            <div 
                                className="d-flex flex-column"
                                style={{ 
                                    flex: window.innerWidth >= 768 ? '1' : 'none',
                                    minWidth: 0 // Para permitir que el texto se corte
                                }}
                            >
                                <Card.Title 
                                    className="text-light mb-1"
                                    style={{ 
                                        fontSize: window.innerWidth < 576 ? '1rem' : '1.1rem'
                                    }}
                                >
                                    @{user.nickName}
                                </Card.Title>
                                <Card.Subtitle className="text-secondary small">
                                    {currentTime.toLocaleString(undefined, {
                                        dateStyle: 'short',
                                        timeStyle: 'short'
                                    })}
                                </Card.Subtitle>
                            </div>
                            
                            {/* Botón Agregar Tag */}
                            <div 
                                className="d-flex"
                                style={{
                                    justifyContent: window.innerWidth < 576 ? 'center' : 'flex-end',
                                    alignSelf: window.innerWidth < 576 ? 'stretch' : 'center'
                                }}
                            >
                                <Button 
                                    variant="outline-success" 
                                    size="sm" 
                                    onClick={agregarTag}
                                    style={{
                                        width: window.innerWidth < 576 ? '100%' : 'auto',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {/* Texto adaptivo */}
                                    {window.innerWidth >= 768 ? 'Agregar Tag' : '+ Tag'}
                                </Button>
                            </div>
                        </div>

                        {/* Tags seleccionados */}
                        {tags && tags.length > 0 && (
                            <div className="mt-3">
                                <div className="d-flex flex-wrap gap-2 align-items-center">
                                    <small className="text-muted">Tags:</small>
                                    <div className="d-flex flex-wrap gap-1">
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
                                </div>
                            </div>
                        )}
                    </Card.Header>

                    {/* ✅ Card.Body con Flexbox */}
                    <Card.Body className="text-light">
                        <div className="d-flex flex-column gap-3">
                            {/* Input de archivos */}
                            <Form.Group controlId="formFile">
                                <Form.Control
                                    className="bg-dark text-light"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                {imagenes.length > 0 && (
                                    <Form.Text className="text-success small mt-1 d-block">
                                        {imagenes.length} imagen(es) seleccionada(s)
                                    </Form.Text>
                                )}
                            </Form.Group>

                            {/* Textarea del contenido */}
                            <Form.Control
                                as="textarea"
                                rows={window.innerWidth < 768 ? 3 : 4}
                                className="bg-dark text-light border-secondary"
                                placeholder="¿Qué estás pensando publicar?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ 
                                    resize: 'vertical',
                                    minHeight: '80px'
                                }}
                            />
                            
                            {/* Contador de caracteres */}
                            <Form.Text className="text-muted small text-end">
                                {content.length}/500 caracteres
                            </Form.Text>
                        </div>
                    </Card.Body>

                    {/* ✅ Card.Footer con Flexbox */}
                    <Card.Footer className="bg-dark border-secondary p-3">
                        <div className="d-flex justify-content-center">
                            <Button 
                                variant="primary" 
                                type="submit"
                                size={window.innerWidth < 576 ? 'lg' : 'md'}
                                disabled={!content && imagenes.length === 0}
                                style={{
                                    width: window.innerWidth < 576 ? '100%' : 'auto',
                                    minWidth: window.innerWidth >= 576 ? '120px' : 'auto'
                                }}
                            >
                                <i className="bi bi-send me-2"></i>
                                Publicar
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Form>

            {/* Modal de Tags */}
            <FormTag
                show={showTagModal}
                onHide={cerrarTagModal}
                user={user}
            />
        </>
    );
};

export default FormPost;

