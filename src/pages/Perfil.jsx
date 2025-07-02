import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileContent from '../components/profile/ProfileContent';
import { getFunctions } from '../components/functions';
import { UserContext } from '../context/UserContext';

const Perfil = () => { // Componente síncrono (no async)
  const [activeTab, setActiveTab] = useState('posts');
  const [userComplete, setUserComplete] = useState(null); // Estado para datos completos
  const { user } = useContext(UserContext);

  useEffect(() => { // useEffect para operaciones async
    const loadUserComplete = async () => {
      if (user?._id) {
        try {
          const userData = await getFunctions.getAUser(user._id);
          setUserComplete(userData);
        } catch (error) {
          console.error("Error loading user:", error);
        }
      }
    };

    loadUserComplete();
  }, [user?._id]); // Se ejecuta cuando cambia user._id

  if (!userComplete) return <div>Cargando...</div>;

  return (
    <Container fluid className="bg-secondary p-4 min-vh-100">
      <ProfileHeader user={userComplete} />

      <div className="w-100 w-md-75 w-lg-50 mx-auto">
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <ProfileContent
          activeTab={activeTab}
          user={userComplete}
        />
      </div>
    </Container>
  );
};

export default Perfil;