import React, {useState}  from "react";
import { useHistory } from "react-router";
import axios from "axios";

const initialUser = {
  username:'',
  password:''
}
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [error, setError] = useState("");
  const {push} = useHistory();
  const [user, setUser] = useState(initialUser)
  const auth = e =>{
    console.log(user)
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, user)
      .then(res =>{
        localStorage.setItem('token', res.data.payload)
        push('/bubbles');
      }).catch(err=> setError('Username or Password not valid.'))
  }

  const handleChange = e =>{

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Log-in</h2>
      </div>
      <form onSubmit ={auth}>
        <label>Username</label>
        <input id='username' type='text' name='username' onChange={handleChange} value={user.username} />
        <label>Password</label>
        <input id='password' type='password' name ='password' onChange={handleChange} value={user.password} />
        <button id = 'submit'>Login</button>
      </form>
      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"