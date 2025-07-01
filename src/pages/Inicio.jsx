import Post from '../components/Post';
import Comment from '../components/Comment';
import FormPost from '../components/FormPost';
import FormComment from '../components/FormComment';
import img1 from '../assets/messi-campeon.jpg';
import img2 from '../assets/dibu-festejo.jpg';
import img3 from '../assets/dibu-colombia.jpg';
import img4 from '../assets/leo-dibu-toro.jpg';

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

function Inicio() {
  return (
    <div className="bg-secondary p-2">
      <FormPost user={user} />
      <Post user={user} post={user.posts[0]}/>
      <FormComment user={user}/>
      <Comment user={user} comment={user.comments[0]}/>
    </div>
  )
}

export default Inicio