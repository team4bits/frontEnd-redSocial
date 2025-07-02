import { Card, Button, Carousel } from 'react-bootstrap';

const Post = ({user, post}) => {
  if (!post) return null;
  
  // Validaciones para imágenes
  const imagenes = post.imagenes || [];
  const tieneImagenes = imagenes && imagenes.length > 0;

  return (
    <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
      <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
        <div>
          <Card.Title className="text-light mb-1">@{user.nickName}</Card.Title>
          <Card.Subtitle className="text-secondary">{post.fecha}</Card.Subtitle>
        </div>
        <div className='d-flex gap-1 flex-wrap justify-content-center'>
          {post.tags && post.tags.length > 0 && post.tags.map((tag, index) => (
            <Button key={index} variant="success" size="sm">
              {tag}
            </Button>
          ))}
        </div>
        <div className='d-flex gap-2'>
          <Button variant="outline-warning" size="sm">Editar</Button>
          <Button variant="outline-danger" size="sm">Eliminar</Button>
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
        <Button variant="outline-primary">Ver Comentarios</Button>
      </Card.Footer>
    </Card>
  )
}

export default Post;
