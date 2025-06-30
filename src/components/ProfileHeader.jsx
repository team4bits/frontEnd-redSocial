const ProfileHeader = ({ user }) => {
  return (
    <div className="w-100 w-md-75 w-lg-50 mx-auto mb-4 bg-dark text-light p-4 rounded text-center" style={{ minHeight: '20rem', maxWidth: '60vw' }}>
      <h2 className="fs-2">{user.nickName}</h2>
      <div className="d-flex justify-content-around w-100 mt-3">
        <span><strong>{user.posts.length}</strong> Posts</span>
        <span><strong>{user.comentarios.length}</strong> Comentarios</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
