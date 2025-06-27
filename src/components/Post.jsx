import { Card, Button } from 'react-bootstrap';
import messiImage from '../assets/messi-campeon.jpg';

const Post = () => {
  return (
    <Card className="w-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem' }}>
      <Card.Header className='d-flex justify-content-between align-items-center bg-dark text-light'>
        <div>
          <Card.Title className="text-light">John Doe</Card.Title>
          <Card.Subtitle className="text-secondary">01-01-2020 00:00 </Card.Subtitle>
        </div>
        <div className='d-flex gap-2'>
          <Button variant="outline-warning">Editar</Button>
          <Button variant="outline-danger">Eliminar</Button>
        </div>
      </Card.Header>
      <Card.Img
        variant="bottom"
        src={messiImage}
        alt="Imagen/imagenes guardada/s"
        className="d-block mx-auto"
        style={{ height: '15rem', width: '300px', objectFit: 'cover' }}
      />
      <Card.Body className="bg-dark text-light">
        <Card.Text className="text-light">
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center align-items-center gap-2 bg-dark text-light'>
        <Button variant="outline-primary">Ver Comentarios</Button>
      </Card.Footer>
    </Card>
  )
}

export default Post
