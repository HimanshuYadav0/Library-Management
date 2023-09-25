import "../css/sidebar.css";
import { useState,useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from "../context/authProvider";


export const Sidebar = () => {
  const {getIssueBooks,issue,role,setToken,setRole} = useContext(AuthContext);
  const navigate = useNavigate();

  const logout=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setToken('');
    setRole('');
  }

  return (
    <>
      <div className="wrapper">
        <div className="sidebar">
          <h3 style={{ color: "white" }}>Library</h3>
          <div className="line"></div>
          {role=='user'?
          <ul>
            <li>
                <NavLink
                  to="dashboard"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item"><GridViewIcon fontSize="small" style={{marginRight:'5px',marginTop:'-3px'}}/>Dashboard</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="books"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">< LibraryBooksIcon fontSize="small" style={{marginRight:'5px',marginTop:'-3px'}}/>Books</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="issued"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item"><LibraryAddCheckIcon fontSize="small" style={{marginRight:'5px',marginTop:'-3px'}}/>Issued</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="returned"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item"><ThumbUpAltIcon fontSize="small" style={{marginRight:'5px',marginTop:'-3px'}}/>Returned</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                  to="request-book"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item"><AddBoxIcon fontSize="small" style={{marginRight:'5px',marginTop:'-3px'}}/>Request Book</span>
                </NavLink>
            </li>
          </ul>:  
          <ul><li>
                <NavLink
                  to="books"
                  className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="item">Books</span>
                </NavLink>
            </li>
            <li>
            <NavLink
              to="add-book"
              className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="item">Add Book</span>
            </NavLink>
        </li>
        <li>
        <NavLink
          to="requested-books"
          className={({ isActive }) => (isActive ? "active" : "")}>
          <span className="item">Requested Books</span>
        </NavLink>
    </li></ul>
    // :<>
    // {navigate('/login')}
  }
          <div className="logout">
          <NavLink
                  to="/"
                  onClick={logout}
                  // className={({ isActive }) => (isActive ? "active" : "")}
                  >
                  <AccountCircleIcon fontSize="medium" style={{marginRight:'5px',marginTop:'-3px'}}/>Logout
                </NavLink>
                </div>
        </div>
      </div>
    </>
  );
};
