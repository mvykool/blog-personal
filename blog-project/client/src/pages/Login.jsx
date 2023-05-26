import { Link } from 'react-router-dom'; 

const Login = () => {
  return (
	<div className="auth">
    <h1>Login</h1>
      <form>
        <input required type="text" placeholder="user-name" />
        <input required type="text" placeholder="password" />
        <button>Login</button>

        <p>this is an error</p>

        <span>Dont you have an account?<Link to="/register">Register</Link> </span>
      </form>
  </div>
  )
}

export default Login