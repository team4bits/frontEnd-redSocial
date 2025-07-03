import { Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const FormPost = ({ user, onPostCreado }) => {
    const [content, setContent] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [tags, setTags] = useState([]); // si lo usás más adelante
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content && imagenes.length === 0) {
            alert("Debes escribir algo o subir una imagen.");
            return;
        }

        try {
            // 1. Crear el post vacío (sin imágenes)
            /*const nuevoPost = {
                userId: user._id,
                content,
                fecha: currentTime.toISOString(),
                tags
            };*/
            const nuevoPost = {
                userId: user._id,
                content,
                fecha: currentTime.toISOString()
                // No enviar 'tags' al crear el post
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

            // 2. Si hay imágenes, subirlas con el postId
            if (imagenes.length > 0) {
                const formData = new FormData();
                formData.append("postId", postCreado._id);
                imagenes.forEach((img) => {
                    formData.append("imagenes", img); // campo correcto: 'imagenes'
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
        <Form onSubmit={handleSubmit}>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                    <div>
                        <Card.Title className="text-light mb-1">@{user.nickName}</Card.Title>
                        <Card.Subtitle className="text-secondary">
                            {currentTime.toLocaleString(undefined, {
                                dateStyle: 'short',
                                timeStyle: 'short'
                            })}
                        </Card.Subtitle>
                    </div>
                    <Button variant="outline-success" size="sm">
                        Agregar Tag
                    </Button>
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
    );
};

export default FormPost;



/*import { Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const FormPost = ({user}) => {
    const [content, setContent] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000); // 60000 = 1 minuto
        return () => clearInterval(timer);
    }, []);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenes(files);
    };

    return (
        <Form>
            <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
                <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                    <div>
                        <Card.Title className="text-light mb-1">@{user.nickName}</Card.Title>
                        <Card.Subtitle className="text-secondary">
                            {currentTime.toLocaleString(undefined, { 
                                dateStyle: 'short',
                                timeStyle: 'short'
                            })}
                        </Card.Subtitle>
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

export default FormPost*/