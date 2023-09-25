import '../css/login.css'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import axios from '../api/axios';
import { useToasts } from 'react-toast-notifications';


const LOGIN_URL = 'https://libr-fcjr.onrender.com/auth/signin';


export default function LoginCard() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const { setToken, setRole, setUser } = useContext(AuthContext);
  const { addToast } = useToasts();
  useEffect(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setToken('');
    setRole('');
  }, [])

  const handleSubmit = async (props) => {
    props.preventDefault();


    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ Email: email, password }));
      // if(response.data=='invalid email or password');
      // addToast(response.data,{appearance:'error'});

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('role', response.data.user.role);
      setToken(response.data.token);
      setRole(response.data.user.role);
      setUser(response.data.user);
      setEmail('');
      setPassword('');

      response.data.user.role == 'user' ? navigate('/home') : navigate('/home/books');
      console.log("done");
      addToast('succesfully logged in', { appearance: 'success' });
    }
    catch (e) {
      console.log(e);
      addToast("invalid email or password", { appearance: 'error' });

    }

  }

  return (
    <><div id="triangle-up"></div>
      <div className="wrapper">

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              htmlFor='email'
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required />
            <label htmlFor='email'>Email Address</label>
          </div>
          <div className="field">
            <input type="password"
              htmlFor='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className="field">
            <input type="submit" value="Login" />
          </div>

          <div className="signup-link">Not a member?  <Link to='/signup'>Signup now</Link></div>
        </form>
      </div>
    </>
  );
}
