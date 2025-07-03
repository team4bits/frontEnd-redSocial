import { Card, Button, Carousel } from 'react-bootstrap';
import { useState } from 'react';
import CommentsModal from './CommentsModal';
import FormEditarPost from './FormEditarPost';
import Tag from './Tag';

const Post = ({ user, post, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);

  if (!post) return null;

  // Validaciones para imágenes
  const imagenes = post.imagenes || [];
  const tieneImagenes = imagenes && imagenes.length > 0;

  // Funciones para manejar el modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

 

  return (editando ? (
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
    <>
      <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
        <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
          <div>
            <Card.Title className="text-light mb-1">@{user?.nickName || 'Usuario'}</Card.Title>
            <Card.Subtitle className="text-secondary">{post.fecha}</Card.Subtitle>
          </div>
          <div className='d-flex gap-1 flex-wrap justify-content-center'>
            {tags && tags.length > 0 && tags.map((tag, index) => (
              <Tag key={index} name={tag.nameTag} />
            ))}
          </div>
          <div className='d-flex gap-2'>
            <Button variant="outline-warning" size="sm" onClick={() => setEditando(true)}>Editar</Button>
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

        {/* Sección de imágenes */}
        {tieneImagenes && (
          <div className="p-2">
            {imagenes.length > 1 ? (
              <Carousel indicators={true} controls={true} interval={null} className="w-100">
                {imagenes.map((imageObj, index) => {
                  if (!imageObj || !imageObj.imagen) {
                    return null;
                  }

                  return (
                    <Carousel.Item key={imageObj._id || index}>
                      <img
                        className="d-block w-100 rounded"
                        src={`http://localhost:3001${imageObj.imagen}`}
                        alt={`Imagen ${index + 1}`}
                        style={{ height: '35rem', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Error+al+cargar';
                        }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : (
              imagenes[0] && imagenes[0].imagen ? (
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
          <Button
            variant="outline-primary"
            onClick={handleShowModal}
          >
            Ver Comentarios ({post.comments?.length || 0})
          </Button>
        </Card.Footer>
      </Card>

      {/* Modal de comentarios */}
      <CommentsModal
        show={showModal}
        onHide={handleCloseModal}
        post={post}
        user={user}
      />
    </>
  ));
};

export default Post;
