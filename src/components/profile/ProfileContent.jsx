import { Alert } from 'react-bootstrap';
import Post from '../Post';
import Comment from '../Comment';
import FormPost from '../FormPost';
import { getFunctions } from '../functions';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ProfileContent = ({ activeTab }) => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getFunctions.getPostsFromUser(user._id);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const userComments = await getFunctions.getCommentsFromUser(user._id);
        setComments(userComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPosts();
    fetchComments();
  }, [user._id]);

  useEffect(() => {
    const handleReload = () => {
      console.log("🔄 Recargando datos del perfil...");
      const fetchPosts = async () => {
        try {
          const userPosts = await getFunctions.getPostsFromUser(user._id);
          setPosts(userPosts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      const fetchComments = async () => {
        try {
          const userComments = await getFunctions.getCommentsFromUser(user._id);
          setComments(userComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      fetchPosts();
      fetchComments();
    };

    window.addEventListener("recargar-profile-content", handleReload);
    window.addEventListener("nuevo-post-eliminado", handleReload);
    window.addEventListener("nuevo-post-creado", handleReload);
    return () => {
      window.removeEventListener("recargar-profile-content", handleReload)
      window.removeEventListener("nuevo-post-eliminado", handleReload);
      window.removeEventListener("nuevo-post-creado", handleReload);
    };
  }, [user._id]);

  if (!user) return <div>Cargando...</div>;

  return (
    <>
      {activeTab === 'posts' && (
        <>
          <FormPost user={user} />
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                user={user}
                post={post}
                tags={post.tags || []}
              />
            ))
          ) : (
            <Alert variant="info">No hay posts</Alert>
          )}
        </>
      )}

      {activeTab === 'comments' && (
        comments.length > 0 ? (
          comments.map((comment) => (
            <Comment user={user}
              comment={comment}
              key={comment._id}
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