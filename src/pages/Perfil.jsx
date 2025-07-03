import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileContent from '../components/profile/ProfileContent';

const Perfil = () => { // Componente síncrono (no async)
  const [activeTab, setActiveTab] = useState('posts');
  //const [userComplete, setUserComplete] = useState(null); // Estado para datos completos
 return (
    <Container fluid className="bg-secondary p-4 min-vh-100">
      <ProfileHeader  />

      <div className="w-100 w-md-75 w-lg-50 mx-auto">
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <ProfileContent
          activeTab={activeTab}
          
        />
      </div>
    </Container>
  );
};

export default Perfil;