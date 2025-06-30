import { Alert } from 'react-bootstrap';
import Post from './Post';
import Comment from './Comment';

const ProfileContent = ({ activeTab, user }) => {
  if (activeTab === 'posts') {
    return user.posts.length > 0 ? (
      user.posts.map((post) => (
        <Post 
          key={post.id} 
          fechaDelPost={post.fechaDelPost}
          archivos={post.archivos}
          comentarios={post.comentarios}
        />
      ))
    ) : (
      <Alert variant="info">No hay posts</Alert>
    );
  }

  if (activeTab === 'comments') {
    return user.comentarios.length > 0 ? (
      user.comentarios.map((comentario) => (
        <Comment 
          key={comentario.id} 
          contenido={comentario.contenido}
          fecha={comentario.fecha}
        />
      ))
    ) : (
      <Alert variant="info">No hay comentarios</Alert>
    );
  }

  return null;
};

export default ProfileContent;
