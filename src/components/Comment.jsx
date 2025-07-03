import { deleteFunctions } from "./functions";
import { Card, Button } from 'react-bootstrap';
import { useState, useContext } from "react";
import FormEditarComment from "./FormEditarComment";
import { UserContext } from "../context/UserContext";

const Comment = ({ comment }) => {


    const { user } = useContext(UserContext);

    const [editando, setEditando] = useState(false);

    const eliminarComment = async () => {
        await deleteFunctions.deleteComment(comment._id);
    };

    return editando ? (

        <FormEditarComment
            comment={comment}
            user={user}
            onCancel={() => setEditando(false)}
            onSuccess={() => {
                setEditando(false);
                window.dispatchEvent(new Event("nuevo-comment-creado"));
            }}
        />

    ) : (
        <Card className="w-100 w-md-75 w-lg-50 mx-auto my-5 bg-light text-dark border-dark" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
            <Card.Header className='d-flex justify-content-between align-items-center text-light gap-2'>
                <div>
                    <Card.Title className="mb-1 text-dark">@{user.nickName}</Card.Title>
                    <Card.Subtitle className="text-muted">{comment.fecha} </Card.Subtitle>
                </div>
                <div className='d-flex gap-2'>
                    <Button variant="outline-warning"
                        size="sm"
                        onClick={() => setEditando(true)}
                        className="w-100 w-md-auto">Editar</Button>
                    <Button variant="outline-danger"
                        size="sm"
                        className="w-100 w-md-auto"
                        onClick={eliminarComment}>Eliminar</Button>
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