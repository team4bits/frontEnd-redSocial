import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import ProfileContent from '../components/ProfileContent';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Datos hardcodeados (ejemplo)
  const user = {
    nickName: "leomessi",
    posts: [
      {
        id: 1,
        fechaDelPost: "2023-12-18T12:00:00Z",
        archivos: [],
        comentarios: [
          {
            id: 101,
            contenido: "¡Increíble partido!",
            fecha: "2023-12-18T12:30:00Z"
          }
        ]
      },
      {
        id: 2,
        fechaDelPost: "2023-12-20T10:00:00Z",
        archivos: [
          { id: 201, url: "https://ejemplo.com/foto.jpg" }
        ],
        comentarios: []
      }
    ],
    comentarios: [
      {
        id: 301,
        contenido: "Gracias por el apoyo",
        fecha: "2023-12-19T15:00:00Z"
      }
    ]
  };

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