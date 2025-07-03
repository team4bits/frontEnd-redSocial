import React, { useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import FormEditarPost from './FormEditarPost';

const Post = ({ user, post, tags }) => {
  if (!post) return null;

  const [editando, setEditando] = useState(false);

  const imagenes = post.imagenes || [];
  const tieneImagenes = imagenes.length > 0;

  return editando ? (
    <FormEditarPost
      post={post}
      user={user}
      onCancel={() => setEditando(false)}
      onSuccess={() => {
        setEditando(false);
        window.dispatchEvent(new Event("nuevo-post-creado"));
      }}
    />
  ) : (
    <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
      <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
        <div>
          <Card.Title className="text-light mb-1">@{user.nickName}</Card.Title>
          <Card.Subtitle className="text-secondary">{post.fecha}</Card.Subtitle>
        </div>
        <div className='d-flex gap-1 flex-wrap justify-content-center'>
          {tags && tags.length > 0 && tags.map((tag, index) => (
            <Button key={index} variant="success" size="sm">
              {tag.nameTag}
            </Button>
          ))}
        </div>
        <div className='d-flex gap-2'>
          <Button variant="outline-warning" size="sm" onClick={() => setEditando(true)}>Editar</Button>
          {/*<Button variant="outline-danger" size="sm">Eliminar</Button>*/}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={async () => {
              const confirmar = window.confirm("¿Estás seguro de que querés eliminar este post?");
              if (!confirmar) return;

              try {
                const res = await fetch(`http://localhost:3001/posts/${post._id}`, {
                  method: "DELETE",
                });

                if (!res.ok) throw new Error("Error al eliminar el post");

                alert("Post eliminado correctamente.");
                window.dispatchEvent(new Event("nuevo-post-creado"));
              } catch (err) {
                console.error("Error al eliminar:", err);
                alert("Hubo un error al eliminar el post.");
              }
            }}
          >
            Eliminar
          </Button>

        </div>
      </Card.Header>

      {tieneImagenes && (
        <div className="p-2">
          {imagenes.length > 1 ? (
            <Carousel indicators controls interval={null} className="w-100">
              {imagenes.map((imageObj, index) =>
                imageObj && imageObj.imagen ? (
                  <Carousel.Item key={imageObj._id || index}>
                    <img
                      className="d-block w-100 rounded"
                      src={`http://localhost:3001${imageObj.imagen}`}
                      alt={`Imagen ${index + 1}`}
                      style={{ height: '35rem', objectFit: 'contain' }}
                    />
                  </Carousel.Item>
                ) : null
              )}
            </Carousel>
          ) : (
            imagenes[0]?.imagen ? (
              <img
                className="d-block w-100 rounded"
                src={`http://localhost:3001${imagenes[0].imagen}`}
                alt="Imagen del post"
                style={{ height: '35rem', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Error+al+cargar';
                }}
              />
            ) : (
              <div className="p-3 text-center text-secondary">
                <small>Imagen no disponible</small>
              </div>
            )
          )}
        </div>
      )}

      <Card.Body className="text-light">
        <Card.Text className="text-light text-justify">
          {post.content}
        </Card.Text>
      </Card.Body>

      <Card.Footer className='d-flex justify-content-center align-items-center gap-2 text-light p-3'>
        <Button variant="outline-primary">Ver Comentarios</Button>
      </Card.Footer>
    </Card>
  );
};

export default Post;