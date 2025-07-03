import { Modal, Button } from 'react-bootstrap';
import Comment from './Comment';
import FormComment from './FormComment';
import { getFunctions } from './functions';
import { useEffect, useState, useCallback } from 'react';

const CommentsModal = ({ show, onHide, post, user, currentUser }) => {
  const [commentsWithUsers, setCommentsWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mover fetchUsersForComments fuera del useEffect como useCallback
  const fetchUsersForComments = useCallback(async () => {
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
  }, [post]);

  // useEffect para cargar comentarios inicialmente
  useEffect(() => {
    fetchUsersForComments();
  }, [fetchUsersForComments]);

  // useEffect separado para el event listener
  useEffect(() => {
    const handler = async () => {
      console.log("🔔 Nuevo comentario detectado para post:", post?._id);

      // 1. Disparar evento para que componentes padre recarguen
      window.dispatchEvent(new CustomEvent("recargar-post", {
        detail: { postId: post._id }
      }));

      // 2. Dar un momento para que el backend procese y recargar
      setTimeout(async () => {
        console.log("🔄 Recargando comentarios desde API...");
        await fetchUsersForComments();
        console.log("✅ Comentarios actualizados");
      }, 1000);
    };

    window.addEventListener("nuevo-comentario-creado", handler);
    return () => window.removeEventListener("nuevo-comentario-creado", handler);
  }, [fetchUsersForComments, post?._id]);

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
};

export default CommentsModal;