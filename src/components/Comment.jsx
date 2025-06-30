import { Card, Button } from 'react-bootstrap';

const Comment = ({user, comment}) => {
    return (
        <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-light text-dark border-dark" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
            <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                <div>
                    <Card.Title className="mb-1 text-dark">{user.nickName}</Card.Title>
                    <Card.Subtitle className="text-muted">{comment.fecha} </Card.Subtitle>
                </div>
                <div className='d-flex gap-2'>
                    <Button variant="warning" size="sm">Editar</Button>
                    <Button variant="danger" size="sm">Eliminar</Button>
                </div>
            </Card.Header>
            <Card.Body className="text-dark bg-light rounded">
                <Card.Text className="text-justify">
                    {comment.content}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Comment