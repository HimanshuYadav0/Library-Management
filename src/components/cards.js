import '../css/card.css';
import { AuthContext } from '../context/authProvider';
import { useContext} from 'react';
import { NavLink, useNavigate,createSearchParams } from 'react-router-dom';
export const Card=(props)=>{
  const navigate = useNavigate();
  const params = [['name',`${props.data.name}`]]
  const pathname = '/home/books/book-details' ;
    return(
      <>
      <div class="card" onClick={()=>{
        navigate(`${pathname}?${createSearchParams(params)}`,{state:props})
      }}>
         <img src={props.data.image} class="card-img-top" style={{height:'11rem'}}/>
         <div class="card-body">
         <p class="card-title" style={{fontWeight:'bold'}}>{props.data.name}</p>
         <p class="card-text" style={{color:'#616161'}}>{props.data.author}</p>
         </div>
        </div>
      
      </>
    )
}