import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  } 


  const handleSubmit = async (e) => {
      e.preventDefault()

      //do api request with axios
      try {
        
        const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
  }

  return (
	<div className="auth">
    <h1>Register</h1>
      <form>
        <input required type="text" name='username' placeholder="user-name" onChange={handleChange} />
        <input required type="text" name='email'  placeholder="email" onChange={handleChange} />
        <input required type="password" name='password'  placeholder="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>

        <p>this is an error</p>

        <span>Do you have an account?<Link to="/login">Login</Link> </span>
      </form>
  </div>
  )
}

export default Register