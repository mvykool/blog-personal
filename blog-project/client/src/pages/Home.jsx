import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [cat])
  
  return (
	<div className="home">
    <div className="posts">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className='img'>
            <img src={post.img} alt="" />
          </div>

          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
            </Link>
            <p>{post.desc}</p>
            <button>read more</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Home