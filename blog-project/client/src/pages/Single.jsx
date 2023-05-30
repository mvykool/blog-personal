import {Link, useLocation, useNavigate} from 'react-router-dom';
import Menu from '../components/Menu';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {

  const {currentUser} = useContext(AuthContext);

  const [post, setPost] = useState([])

  const location = useLocation()

  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
	<div className="single">
    <div className="content">
      <img src={post?.img} alt="" />
    <div className="user">
      {post.userImg && <img src={post.userImg} alt="" />}
    <div className="info">
      <span>{post.username}</span>
      <p>posted {moment(post.date).fromNow()}</p>
    </div>  
    {currentUser.username === post.username &&  
    <div className="edit">
      <Link to={`/write?edit=2`}>edit</Link>
      <button onClick={handleDelete}>delete</button>
    </div>
    }
    </div>
    <h1>{post?.title}</h1>
    <p>{post?.desc}</p>    
    </div>
  
    <Menu/>
  </div>
  )
}

export default Single