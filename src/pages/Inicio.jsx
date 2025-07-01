import Post from '../components/Post';
import Comment from '../components/Comment';
import FormPost from '../components/FormPost';
import FormComment from '../components/FormComment';

const user = {
  nickName: "leomessi",
  posts: [
    {
      id: 1,
      fecha: "2023-12-18T12:00:00Z",
      content: "¡Increíble partido!",
      archives: [],
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
      archives: [],
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