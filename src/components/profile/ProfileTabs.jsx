import { Button } from 'react-bootstrap';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <Button 
        variant={activeTab === 'posts' ? 'info' : 'outline-info'} 
        onClick={() => onTabChange('posts')}  //cuando se hace click en el boton, se cambia la pestaña a posts
        className="mx-2"
      >
        Posts
      </Button>
      <Button 
        variant={activeTab === 'comments' ? 'info' : 'outline-info'} 
        onClick={() => onTabChange('comments')}
        className="mx-2"
      >
        Comentarios
      </Button>
    </div>
  );
};
export default ProfileTabs;