import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { AuthContext } from "../context/authProvider"
import '../css/homepage.css';
export const HomePage=()=>{
    const navigate = useNavigate();
    const {role,token} = useContext(AuthContext);
    useEffect(()=>{
        console.log(role);
        console.log(token);
        
    },[])
    return(
        <>
        <div className="body">
        <img src={require("../css/6607.jpg")} style={{boxShadow:'none'}} alt="" className="img-responsive" />
        <Navbar />
        <Outlet />
        <div className="home-text">
        <h1>Library Management System</h1>
        <p>"Libraries store the energy that fuels the imagination. They open up windows to the world and inspire us to explore and achieve, and contribute to improving our quality of life."</p>
        <button className="btn btn-primary" onClick={()=>navigate('/login')}>Read now</button>
        </div>
        <img src={require("../css/5294.jpg")} style={{boxShadow:'none'}} alt="" className="img-2" />
        <div className="quote-div">
        <h4 className="quote">Libraries store the energy that fuels the imagination. They open up windows to the world and inspire us to explore and achieve, and contribute to improving our quality of life</h4>
        </div>
        </div>
        <div className="footer">
        <p style={{padding:'32px'}}>Copyright &copy; 2023 All Rights Reserved.</p>
        </div>
        </>
    )
}