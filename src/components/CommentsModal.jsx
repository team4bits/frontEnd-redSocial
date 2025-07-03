import { Modal, Button } from 'react-bootstrap';
import Comment from './Comment';
import FormComment from './FormComment';
import { getFunctions } from './functions';
import { useEffect, useState } from 'react';

const CommentsModal = ({ show, onHide, post, user, currentUser }) => {
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersForComments = async () => {
      if (post?.comments && post.comments.length > 0) {
        try {
          setLoading(true);

          const commentsWithUserData = await Promise.all(
            post.comments.map(async (comment) => {
              let userId;

              if (typeof comment.userId === 'string') {
                userId = comment.userId;
              } else if (comment.userId && comment.userId._id) {
                userId = comment.userId._id;
              } else {
                console.error("Formato de userId no reconocido:", comment.userId);
                return comment;
              }

              const userData = await getFunctions.getUserByObjectId(userId);
              return { ...comment, user: userData };
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

    const handler = async () => {
      console.log("🔔 Nuevo comentario detectado");

      // Disparar evento para recargar post
      window.dispatchEvent(new CustomEvent("recargar-post", {
        detail: { postId: post._id }
      }));

      // Detectar si estamos en Perfil o Inicio
      const isProfile = window.location.pathname.includes('/perfil');

      if (isProfile) {
        // En Perfil: dar más tiempo y solo cerrar modal
        setTimeout(() => {
          onHide(); // Cerrar modal
          window.location.reload(); // Recargar después
        }, 1500);
      } else {
        // En Inicio: recargar inmediatamente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    // AGREGAR ESTAS LÍNEAS QUE FALTABAN:
    window.addEventListener("nuevo-comentario-creado", handler);
    return () => window.removeEventListener("nuevo-comentario-creado", handler);
  }, []); // ← Cerrar el useEffect aquí

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>
          Comentarios del post de @{user?.nickName || 'Usuario'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <div className="mb-4">
          <h6 className="text-light mb-3">
            Comentarios ({commentsWithUsers?.length || 0}):
          </h6>

          {loading ? (
            <div className="text-center p-4">
              <p>Cargando comentarios...</p>
            </div>
          ) : commentsWithUsers.length > 0 ? (
            commentsWithUsers.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                user={comment.user}
              />
            ))
          ) : (
            <div className="text-center p-4">
              <p>No hay comentarios aún</p>
              <small className="text-muted">¡Sé el primero en comentar!</small>
            </div>
          )}
        </div>

        <div className="mt-3 p-3 border border-secondary rounded">
          <h6 className="text-light mb-3">Agregar un comentario:</h6>
          <FormComment post={post} user={currentUser} />
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}; // ← QUITAR EL } DE MÁS QUE TENÍAS AQUÍ

export default CommentsModal;