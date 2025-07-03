import {useContext} from 'react';
import {UserContext} from '../../context/UserContext';


const ProfileHeader = () => {
  const {user} = useContext(UserContext);

  return (
    <div className="w-100 w-md-75 w-lg-50 mx-auto mb-4 bg-dark text-light p-4 rounded text-center" style={{ minHeight: '10rem', maxWidth: '60vw' }}>
      <h2 className="fs-2">{user.nickName}</h2>
      <div className="d-flex justify-content-around w-100 mt-3">
        <span><strong>{user.posts.length}</strong> Post{user.posts.length==1?"":"s"}</span>
        <span><strong>{user.comments.length}</strong> Comentario{user.comments.length==1?"":"s"}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
