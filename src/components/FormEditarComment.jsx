import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { API_URL, apiEndpoints } from '../config/api';

const FormEditarComment = ({ comment, user, onCancel, onSuccess }) => {
    const [content, setContent] = useState(comment.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Actualizar el contenido del comentario
            const resPost = await fetch(`${API_URL}${apiEndpoints.comments}/${comment._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (!resPost.ok) throw new Error("Error al actualizar el comentario");

            alert("¡Comentario actualizado exitosamente!");

            // ✅ EVENTOS PARA ACTUALIZAR TODAS LAS VISTAS
            window.dispatchEvent(new Event("nuevo-comentario-creado"));
            window.dispatchEvent(new Event("comentario-actualizado"));
            window.dispatchEvent(new Event("perfil-actualizado"));
            
            onSuccess?.();
        } catch (error) {
            console.error("Error al editar comentario:", error);
            alert("Error al editar el comentario: " + error.message);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Card 
                    className="mx-auto my-5 bg-dark text-light" 
                    style={{ 
                        minHeight: '20rem', 
                        width: '100%',
                        maxWidth: 'min(90vw, 800px)'
                    }}
                >
                    {/* Header responsive con Flexbox */}
                    <Card.Header className="text-light p-3">
                        <div 
                            className="d-flex"
                            style={{
                                flexDirection: window.innerWidth < 576 ? 'column' : 'row',
                                justifyContent: 'space-between',
                                alignItems: window.innerWidth < 576 ? 'stretch' : 'center',
                                gap: window.innerWidth < 576 ? '1rem' : '0.5rem'
                            }}
                        >
                            {/* Título del usuario */}
                            <Card.Title 
                                className="mb-0"
                                style={{ 
                                    fontSize: window.innerWidth < 576 ? '1rem' : '1.1rem'
                                }}
                            >
                                Editando comentario de @{user.nickName}
                            </Card.Title>
                            
                            {/* Botones de acción */}
                            <div 
                                className="d-flex gap-2"
                                style={{
                                    flexDirection: window.innerWidth < 576 ? 'column' : 'row'
                                }}
                            >
                                <Button 
                                    size="sm" 
                                    variant="secondary" 
                                    onClick={onCancel}
                                    style={{
                                        width: window.innerWidth < 576 ? '100%' : 'auto'
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    size="sm" 
                                    type="submit" 
                                    variant="primary"
                                    style={{
                                        width: window.innerWidth < 576 ? '100%' : 'auto'
                                    }}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </Card.Header>

                    {/* Body con Flexbox */}
                    <Card.Body className="p-3">
                        <div className="d-flex flex-column gap-3">
                            {/* Textarea del contenido */}
                            <Form.Group controlId="editContent">
                                <Form.Label className="text-light">Contenido del comentario:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={window.innerWidth < 768 ? 3 : 4}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="bg-dark text-light border-secondary"
                                    placeholder="Escribe el contenido de tu comentario..."
                                    style={{ 
                                        resize: 'vertical',
                                        minHeight: '80px'
                                    }}
                                />
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Card>
            </Form>
        </>
    );
};

export default FormEditarComment;
