import { Card, Button, Carousel } from 'react-bootstrap';
import img1 from '../assets/messi-campeon.jpg';
import img2 from '../assets/dibu-festejo.jpg';
import img3 from '../assets/dibu-colombia.jpg';
import img4 from '../assets/leo-dibu-toro.jpg';

const Post = () => {
  const images = [img1, img2, img3, img4];
  const tags = ["campeones del mundo", "festejos", "Argentina"];

  return (
    <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
      <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
        <div>
          <Card.Title className="text-light mb-1">Lionel Andrés Messi</Card.Title>
          <Card.Subtitle className="text-secondary">18-12-2022 00:00 </Card.Subtitle>
        </div>
        <div className='d-flex gap-1 flex-wrap justify-content-center'>
          {tags.map((tag, index) => (
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
      <div className="p-2">
        {images.length > 1 &&
          <Carousel indicators={true} controls={true} interval={null} className="w-100">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded"
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  style={{ height: '35rem', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        }
        {images.length === 1 &&
          <img
            className="d-block w-100 rounded"
            src={images[0]}
            alt={`Imagen 1`}
            style={{ height: '35rem', objectFit: 'contain' }}
          />
        }
      </div>

      <Card.Body className="text-light">
        <Card.Text className="text-light text-justify">
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
        </Card.Text>
      </Card.Body>

      <Card.Footer className='d-flex justify-content-center align-items-center gap-2 text-light p-3'>
        <Button variant="outline-primary">Ver Comentarios</Button>
      </Card.Footer>
    </Card>
  )
}

export default Post
