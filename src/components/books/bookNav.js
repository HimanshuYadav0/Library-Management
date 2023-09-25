import "../../css/books.css";
import {useState,useContext} from 'react';
import { AuthContext } from "../../context/authProvider";
import { useNavigate,createSearchParams } from "react-router-dom";



export const BooksNav = ({name}) => {

  const[search,setSearch] = useState('');
  const{searchbook} = useContext(AuthContext);
  const navigate = useNavigate();
  const params = [['name',`${search}`]]
  const pathname = '/home/books/search' ;
  const [value,setValue] = useState('Search By');
  const [option,setOption] = useState('Search By');
    
    const submit=(props)=>{
      props.preventDefault();
      console.log("called");
      if (option === 'Search By') {
        // addToast('Please select a search option', { appearance: 'error' });
        return true;
    }
    searchbook(option, search);
      navigate(`${pathname}?${createSearchParams(params)}`);
    }
  //   const searchHandler = (e) => {
  //     e.preventDefault();
  //     if (option === 'Search By') {
  //         addToast('Please select a search option', { appearance: 'error' });
  //         return true;
  //     }

  //     searchbook(option, search);
  //     navigate(`${pathname}?${createSearchParams(params)}`);
  // }

  return (
    <div className="booknav" > 
    
      <nav
        class="navbar navbar-expand-lg navbar-light  "
        style={{ backgroundColor: "white",boxShadow: '0 0 11px rgba(33,33,33,.2)' }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            {name}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            
            <span class="navbar-toggler-icon"></span>
          </button>
          {name=='Books'?<>
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {value}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => {
                                            setValue('Title')
                                            setOption('name')
                                        }}>Title</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => {
                                            setValue('Author')
                                            setOption('author')
                                        }}>Author</a></li>
                                       
                                    </ul>
                                
      </li>
            </ul>
            <form class='d-flex' onSubmit={submit}>
              <input
                class="form-control me-2"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=>setSearch(e.target.value)}
               value={search}
              />
              <button class="btn btn-outline-success"
              
               >
                Search
              </button>
              </form>
          </div></>:null}
        </div>
      </nav>
    </div>
  );
};
