import {Link} from 'react-router-dom';
import Menu from '../components/Menu';

const Single = () => {
  return (
	<div className="single">
    <div className="content">
      <img src="https://images.unsplash.com/photo-1684690640456-381bc7183e86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80" alt="" />
    <div className="user">
      <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
    <div className="info">
      <span>john</span>
      <p>posted 2 days ago</p>
    </div>  
    <div className="edit">
      <Link to={`/write?edit=2`}>edit</Link>
      <p>delete</p>
    </div>
    </div>
    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi ipsa sequi, laboriosam, sapiente, doloremque in error veniam fugit sed quae odio? Molestias, iure nsectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio nsectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio!</p>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio! nsectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio</p>


    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio! nsectetur adipisicing elit. Est eligendi quaerat dolorum dolore. Est eum iusto sunt, dolorum exercitationem magni asperiores error a excepturi, neque rerum consequuntur provident animi odio</p>    
    </div>
  
    <Menu/>
  </div>
  )
}

export default Single