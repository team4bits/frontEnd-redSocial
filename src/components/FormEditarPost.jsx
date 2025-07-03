import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { API_URL, apiEndpoints } from '../config/api';

const FormEditarPost = ({ post, user, onCancel, onSuccess }) => {
    const [content, setContent] = useState(post.content);
    const [imagenes, setImagenes] = useState([]);
    const [editandoImagenes, setEditandoImagenes] = useState(post.imagenes || []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Actualizar contenido
            const resPost = await fetch(`${API_URL}${apiEndpoints.posts}/${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (!resPost.ok) throw new Error("Error al actualizar el post");

            // 2. Reemplazar imágenes existentes (si hay nuevas)
            if (imagenes.length > 0 && editandoImagenes.length > 0) {
                for (let i = 0; i < Math.min(imagenes.length, editandoImagenes.length); i++) {
                    const formData = new FormData();
                    formData.append("imagenes", imagenes[i]);

                    const resImg = await fetch(`${API_URL}${apiEndpoints.archives}/${editandoImagenes[i]._id}`, {
                        method: "PUT",
                        body: formData
                    });

                    if (!resImg.ok) {
                        throw new Error("Error al actualizar imagen");
                    }
                }
            }

            alert("¡Post actualizado con éxito!");
            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("Error al editar el post");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Title className="mb-0">@{user.nickName}</Card.Title>
                    <div className="d-flex gap-2">
                        <Button size="sm" variant="secondary" onClick={onCancel}>Cancelar</Button>
                        <Button size="sm" type="submit" variant="primary">Guardar</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Form.Group controlId="editContent" className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="bg-dark text-light"
                        />
                    </Form.Group>

                    <Form.Group controlId="editImages" className="mb-3">
                        <Form.Label>Reemplazar imágenes existentes</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="bg-dark text-light"
                        />
                        <Form.Text className="text-muted">
                            Se reemplazarán hasta {editandoImagenes.length} imágenes existentes.
                        </Form.Text>
                    </Form.Group>
                </Card.Body>
            </Card>
        </Form>
    );
};

export default FormEditarPost;
