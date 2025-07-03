import { Modal, Button } from 'react-bootstrap';
import Comment from './Comment';
import FormComment from './FormComment';
import { getFunctions } from './functions';
import { useEffect, useState } from 'react';

const CommentsModal = ({ show, onHide, post, user }) => {
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersForComments = async () => {
      if (post?.comments && post.comments.length > 0) {
        try {
          setLoading(true);
          
          // Cargar usuarios para cada comentario
          const commentsWithUserData = await Promise.all(
            post.comments.map(async (comment) => {
              let userId;
              
              // Detectar el formato del userId
              if (typeof comment.userId === 'string') {
                // Caso Inicio: userId es un string
                userId = comment.userId;
              } else if (comment.userId && comment.userId._id) {
                // Caso Perfil: userId es un objeto con _id
                userId = comment.userId._id;
              } else {
                console.error("Formato de userId no reconocido:", comment.userId);
                return comment; // Retornar sin modificar si no se puede procesar
              }
              
              const userData = await getFunctions.getUserByObjectId(userId);
              
              return {
                ...comment,
                user: userData // ← Reemplazar userId por user con datos completos
              };
            })
          );
          
          setCommentsWithUsers(commentsWithUserData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching users for comments:", error);
          setLoading(false);
        }
      } else {
        setCommentsWithUsers([]);
        setLoading(false);
      }
    };

    fetchUsersForComments();
  }, [post?.comments]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>
          Comentarios del post de @{user?.nickName || 'Usuario'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {/* Lista de comentarios existentes */}
        <div className="mb-4">
          <h6 className="text-light mb-3">
            Comentarios ({commentsWithUsers?.length || 0}):
          </h6>
          
          {loading ? (
            <div className="text-center p-4">
              <p>Cargando comentarios...</p>
            </div>
          ) : commentsWithUsers && commentsWithUsers.length > 0 ? (
            commentsWithUsers.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                user={comment.user} // ← Ahora user tiene todos los datos
              />
            ))
          ) : (
            <div className="text-center p-4">
              <p>No hay comentarios aún</p>
              <small className="text-muted">¡Sé el primero en comentar!</small>
            </div>
          )}
        </div>

        {/* Formulario para agregar comentario - abajo de los comentarios */}
        <div className="mt-3 p-3 border border-secondary rounded">
          <h6 className="text-light mb-3">Agregar un comentario:</h6>
          <FormComment post={post} user={user} />
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;