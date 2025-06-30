import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileContent from '../components/profile/ProfileContent';
import getFunctions from '../components/functions';

const usuarios = await getFunctions.getAllUsers ;  
const user = usuarios[0]; // Simulando un usuario para el perfil

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('posts');
  return (
    <Container fluid className="bg-secondary p-4 min-vh-100">
      <ProfileHeader user={user} />

      <div className="w-100 w-md-75 w-lg-50 mx-auto">
        <ProfileTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <ProfileContent 
          activeTab={activeTab} 
          user={user} 
        />
      </div>
    </Container>
  );
};

export default Perfil;