import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileContent from '../components/profile/ProfileContent';
import { getFunctions } from '../components/functions';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);  // Inicializo el estado del usuario como null. SetUser es una función que me permite actualizar el estado del usuario una vez que se obtienen los datos del usuario logueado.
  
  useEffect(() => {      //Realizo useEffect para cargar los datos del usuario una vez que el componente se renderiza
    const loadUser = async () => {
      try {
        const userData = await getFunctions.getAUser("6851f9ea39e77d8f96470460");
        setUser(userData);  
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };
    
    loadUser();
  }, []);  //Realiza useEffect la primera vez que se renderiza, despues habria que cambiarlo para que se haga cada vez que cambie el user logueado
  
  if (!user) return <div>Cargando...</div>;

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