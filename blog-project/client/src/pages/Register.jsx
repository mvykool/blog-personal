import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import axios from 'axios';


const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  } 


  const handleSubmit = async (e) => {
      e.preventDefault()

      //do api request with axios
      try {
        
        const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
        console.log(res)
        navigate("/login")

      } catch (error) {
        setError(error.response.data)
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

        {error && <p>{error}</p>}

        <span>Do you have an account?<Link to="/login">Login</Link> </span>
      </form>
  </div>
  )
}

export default Register