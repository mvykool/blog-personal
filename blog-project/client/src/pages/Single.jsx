import {Link, useLocation} from 'react-router-dom';
import Menu from '../components/Menu';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const Single = () => {

  const [post, setPost] = useState([])

  const location = useLocation()

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

  const {currentUser} = useContext(AuthContext);
  
  return (
	<div className="single">
    <div className="content">
      <img src={post.img} alt="" />
    <div className="user">
      <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
    <div className="info">
      <span>{post.username}</span>
      <p>posted {moment(post.date).fromNow()}</p>
    </div>  
    {currentUser.username === post.username &&  
    <div className="edit">
      <Link to={`/write?edit=2`}>edit</Link>
      <p>delete</p>
    </div>
    }
    </div>
    <h1>{post.title}</h1>
    <p>{post.desc}</p>    
    </div>
  
    <Menu/>
  </div>
  )
}

export default Single