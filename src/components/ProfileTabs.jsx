import { Button } from 'react-bootstrap';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="d-flex justify-content-center mb-4">
      <Button 
        variant={activeTab === 'posts' ? 'primary' : 'outline-primary'} 
        onClick={() => onTabChange('posts')}
        className="mx-2"
      >
        Posts
      </Button>
      <Button 
        variant={activeTab === 'comments' ? 'primary' : 'outline-primary'} 
        onClick={() => onTabChange('comments')}
        className="mx-2"
      >
        Comentarios
      </Button>
    </div>
  );
};
export default ProfileTabs;