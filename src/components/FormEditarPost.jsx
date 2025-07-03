import { useState, useContext } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { API_URL, apiEndpoints } from '../config/api';
import { UserContext } from '../context/UserContext';
const FormEditarPost = ({ post, onCancel, onSuccess }) => {
    const { user } = useContext(UserContext);
    const [content, setContent] = useState(post.content);
    const [imagenes, setImagenes] = useState([]);
    const [editandoImagenes, setEditandoImagenes] = useState(post.imagenes || []);
    const [showTagModal, setShowTagModal] = useState(false);

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
        try {
            // 1. Actualizar el contenido del post
            const resPost = await fetch(`${API_URL}${apiEndpoints.posts}/${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (!resPost.ok) throw new Error("Error al actualizar el post");

            // 2. Eliminar imágenes anteriores
            for (const img of editandoImagenes) {
                if (!img?._id) continue;

                const resDelete = await fetch(`${API_URL}${apiEndpoints.archives}/${img._id}`, {
                    method: "DELETE",
                });

                if (!resDelete.ok) {
                    console.warn("No se pudo eliminar imagen:", img._id);
                }
            }

            // 3. Subir nuevas imágenes si hay
            if (imagenes.length > 0) {
                const formData = new FormData();
                formData.append("postId", post._id);
                imagenes.forEach((img) => {
                    formData.append("imagenes", img);
                });

                const resUpload = await fetch(`${API_URL}${apiEndpoints.archives}`, {
                    method: "POST",
                    body: formData,
                });

                if (!resUpload.ok) throw new Error("Error al subir nuevas imágenes");
            }

            alert("¡Post actualizado con nuevas imágenes!");
            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("Error al editar el post");
        }
    };

    return (
        <>
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
                    <Card.Footer>
                        <Button variant="outline-success" size="sm" onClick={agregarTag}>
                            Agregar Tag
                        </Button>
                        <FormTag />
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

export default FormEditarPost;
