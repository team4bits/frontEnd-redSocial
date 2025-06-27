import { Card, Button } from 'react-bootstrap';
import img1 from '../assets/messi-campeon.jpg';
import img2 from '../assets/dibu-festejo.jpg';
import img3 from '../assets/dibu-colombia.jpg';
import img4 from '../assets/leo-dibu-toro.jpg';

const Post = () => {
  return (
    <Card className="w-50 mx-auto my-5 bg-dark text-light" style={{ minHeight: '20rem' }}>
      <Card.Header className='d-flex justify-content-between align-items-center text-light'>
        <div>
          <Card.Title className="text-light">John Doe</Card.Title>
          <Card.Subtitle className="text-secondary">01-01-2020 00:00 </Card.Subtitle>
        </div>
        <div className='d-flex gap-2'>
          <Button variant="outline-warning">Editar</Button>
          <Button variant="outline-danger">Eliminar</Button>
        </div>
      </Card.Header>
      <div className="p-3 d-flex justify-content-center">
        <Card.Img
          variant="bottom"
          src={img3}
          alt="Imagen/imagenes guardada/s"
          className="rounded w-100 h-auto"
        />
      </div>
      <Card.Body className="text-light">
        <Card.Text className="text-light text-justify">
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
          content content content content content content content content content content content
        </Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-center align-items-center gap-2 text-light'>
        <Button variant="outline-primary">Ver Comentarios</Button>
      </Card.Footer>
    </Card>
  )
}

export default Post
