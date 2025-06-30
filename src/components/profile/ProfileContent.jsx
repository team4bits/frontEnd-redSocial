import { Alert, Form } from 'react-bootstrap';
import Post from '../Post';
import Comment from '../Comment';
import FormPost from '../FormPost';

const ProfileContent = ({ activeTab, user }) => {
  <FormPost />
  if (activeTab === 'posts') {
    return user.posts.length > 0 ? (
      user.posts.map((post) => (
        <Post 
          key={post.id} 
          fecha={post.fecha}
          archives={post.archives}
          comments={post.comments}
        />
      ))
    ) : (
      <Alert variant="info">No hay posts</Alert>
    );
  }

  if (activeTab === 'comments') {
    return user.comments.length > 0 ? (
      user.comments.map((comment) => (
        <Comment 
          key={comment.id} 
          content={comment.content}
          fecha={comment.fecha}
        />
      ))
    ) : (
      <Alert variant="info">No hay comentarios</Alert>
    );
  }

  return null;
};

export default ProfileContent;