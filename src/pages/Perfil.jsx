import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfileContent from '../components/profile/ProfileContent';
import img1 from '../assets/messi-campeon.jpg';
import img2 from '../assets/dibu-festejo.jpg';
import img3 from '../assets/dibu-colombia.jpg';
import img4 from '../assets/leo-dibu-toro.jpg';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Datos hardcodeados
const user = {
  nickName: "leomessi",
  posts: [
    {
      id: 1,
      fecha: "2023-12-18T12:00:00Z",
      content: "¡Increíble partido!",
      images: [img1, img2],
      tags : ["campeones del mundo"],
      comments: [
        {
          id: 101,
          content: "¡Increíble partido!",
          fecha: "2023-12-18T12:30:00Z"
        }
      ]
    },
    {
      id: 2,
      fecha: "2023-12-20T10:00:00Z",
      content: "Otro post genial",
      images: [img3, img4],
      tags: ["festejos", "Argentina"],
      comments: []
    }
  ],
  comments: [
    {
      id: 301,
      content: "Gracias por el apoyo",
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