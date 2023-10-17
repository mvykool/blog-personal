import { Link, useNavigate } from 'react-router-dom'; 
import { useContext, useState } from 'react';
import { AuthContext } from "../context/authContext"

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser, login } = useContext(AuthContext);
  
  console.log(currentUser)

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  } 

  const handleSubmit = async (e) => {
      e.preventDefault()

      //do api request with axios
      try {
        await login(inputs)
        navigate("/")

      } catch (error) {
        setError(error.response.data)
      }
  }
  console.log(inputs)

  return (
	<div className="auth">
    <h1>Login</h1>
      <form>
        <input required type="text" placeholder="user-name" name='username' onChange={handleChange} />

        <input required type="password" placeholder="password" name='password' onChange={handleChange}/>

        <button onClick={handleSubmit}>Login</button>

        {error && <p>{error}</p>}

        <span>Dont you have an account?<Link to="/register">Register</Link> </span>
      </form>
  </div>
  )
}

export default Login