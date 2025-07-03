import { Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API_URL, apiEndpoints } from '../config/api'

const FormComment = ({ post, user }) => {
    const [content, setContent] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            alert("Debes escribir un comentario.");
            return;
        }

        try {
            // Crear el comentario
            const nuevoComentario = {
                postId: post._id,        // ← ID del post al que pertenece
                userId: user._id,        // ← Usuario que comenta
                content: content.trim() // ← Contenido del comentario
            };

            console.log("Payload del comentario:", nuevoComentario);
            
            const response = await fetch(`${API_URL}${apiEndpoints.comments}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoComentario)
            });

            if (!response.ok) throw new Error("Error al crear el comentario");

            const comentarioCreado = await response.json();
            console.log("Comentario creado:", comentarioCreado);

            alert("¡Comentario publicado con éxito!");
            setContent(""); // Limpiar el formulario
            
            // Disparar evento para actualizar la UI
            window.dispatchEvent(new Event("nuevo-comentario-creado"));
            
        } catch (error) {
            console.error("Error al comentar:", error);
            alert("Ocurrió un error al intentar comentar.");
        }
    };

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Control
                type="text"
                placeholder="Escribe tu comentario..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='mb-3'
            />
            <Button variant="primary" type="submit">
                Comentar
            </Button>
        </Form>
    );
};

export default FormComment;