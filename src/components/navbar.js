import '../css/navbar.css';
import {Link, useNavigate,NavLink} from 'react-router-dom';
import { useState } from "react";


export const Navbar = () => {
    const[loginActive,setLoginActive] = useState(false);
    const[signinActive,setSignActive] = useState(false);

    const navigate = useNavigate();

    const loginfn=()=>{
        setSignActive(false);
        loginActive?navigate('/'):navigate('/login');
        setLoginActive(!loginActive);
    }
    const signinfn=()=>{
        setLoginActive(false);
        signinActive?navigate('/'):navigate('/signup');
        setSignActive(!signinActive);
    }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid">
        <h2 className="navbar-brand" >
          LIBRARY
        </h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <button className='btn btn-primary navbarc me-2' style={{backgroundColor:'transparent',color:'black',borderColor:'transparent'}} onClick={loginfn}>Login</button>
            </li>
            <li className="nav-item">
            <button className='btn btn-primary navbarc' style={{backgroundColor:'transparent',color:'black',borderColor:'transparent'}} onClick={signinfn}>Signup</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};
