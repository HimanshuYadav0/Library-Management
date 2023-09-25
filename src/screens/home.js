import { useContext, useEffect ,useState} from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../context/authProvider";


export const Home=()=>{

    
    const {setToken,setRole,getBooks,getFine,getIssueBooks,getReturnBooks,role,token} =useContext(AuthContext);

    useEffect(()=>{

//  getBooks('Entertainment');
//          getBooks('Humour');
//          getBooks('Biography');
//          getBooks('Poetry-Drama');
//         getBooks('Art-Photography');
        getFine();
        getIssueBooks();
        getReturnBooks();
        
        
        setTimeout(()=>{
            setToken(sessionStorage.getItem('token'));
            setRole(sessionStorage.getItem('role'));
            
          },10);
    },[])
    
    return(
        <>
        <Sidebar/>
        <Outlet />
        </>
    )
}
