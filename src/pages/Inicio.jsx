import Post from '../components/Post';
import Comment from '../components/Comment';
import FormPost from '../components/FormPost';
import FormComment from '../components/FormComment';

function Inicio() {
  return (
    <div className="bg-secondary p-2">
      <FormPost />
      <Post />
      <FormComment />
      <Comment />
    </div>
  )
}

export default Inicio