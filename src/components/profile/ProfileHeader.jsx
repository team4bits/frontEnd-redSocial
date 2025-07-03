import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { getFunctions } from '../functions';

const ProfileHeader = () => {
  const { user } = useContext(UserContext);
  const [postsCount, setPostsCount] = useState(user?.posts?.length || 0);
  const [commentsCount, setCommentsCount] = useState(user?.comments?.length || 0);

  // Actualizar contadores inicialmente
  useEffect(() => {
    setPostsCount(user?.posts?.length || 0);
    setCommentsCount(user?.comments?.length || 0);
  }, [user?.posts?.length, user?.comments?.length]);

  // Escuchar eventos para actualizar contadores
  useEffect(() => {
    const handleReload = async () => {
      console.log("🔄 Actualizando contadores del header...");
      
      try {
        const userPosts = await getFunctions.getPostsFromUser(user._id);
        const userComments = await getFunctions.getCommentsFromUser(user._id);
        
        setPostsCount(userPosts.length);
        setCommentsCount(userComments.length);
      } catch (error) {
        console.error("Error actualizando contadores:", error);
      }
    };

    // Escuchar los mismos eventos que ProfileContent
    window.addEventListener("recargar-profile-content", handleReload);
    window.addEventListener("nuevo-post-eliminado", handleReload);
    window.addEventListener("nuevo-post-creado", handleReload);
    window.addEventListener("nuevo-comment-eliminado", handleReload);
    
    return () => {
      window.removeEventListener("recargar-profile-content", handleReload);
      window.removeEventListener("nuevo-post-eliminado", handleReload);
      window.removeEventListener("nuevo-post-creado", handleReload);
      window.removeEventListener("nuevo-comment-eliminado", handleReload);
    };
  }, [user._id]);

  return (
    <div className="w-100 w-md-75 w-lg-50 mx-auto mb-4 bg-dark text-light p-4 rounded text-center" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
      <h2 className="fs-2">{user.nickName}</h2>
      <div className="d-flex justify-content-around w-100 mt-3">
        <span><strong>{postsCount}</strong> Post{postsCount == 1 ? "" : "s"}</span>
        <span><strong>{commentsCount}</strong> Comentario{commentsCount == 1 ? "" : "s"}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
