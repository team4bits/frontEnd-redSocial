import { Alert, Form } from 'react-bootstrap';
import Post from '../Post';
import Comment from '../Comment';
import FormPost from '../FormPost';

const ProfileContent = ({ activeTab, user }) => {
  return (
    <>
      {activeTab === 'posts' && (
        <>
          <FormPost />
          {user.posts.length > 0 ? (
            user.posts.map((post) => (
              <Post 
                key={post.id} 
                user={user}
                post={post}
              />
            ))
          ) : (
            <Alert variant="info">No hay posts</Alert>
          )}
        </>
      )}

      {activeTab === 'comments' && (
        user.comments.length > 0 ? (
          user.comments.map((comment) => (
            <Comment 
              key={comment.id} 
              content={comment.content}
              fecha={comment.fecha}
            />
          ))
        ) : (
          <Alert variant="info">No hay comentarios</Alert>
        )
      )}
    </>
  );
};

export default ProfileContent;