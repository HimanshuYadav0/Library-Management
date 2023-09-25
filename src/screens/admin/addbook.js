import '../../css/admin/addbook.css'
import { BooksNav } from '../../components/books/bookNav';
import { useContext, useEffect, useState } from 'react';
import { Book } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import { useToasts } from 'react-toast-notifications';
import { background } from '@chakra-ui/react';

export const AddBook=()=>{
    const location = useLocation();
    const[book,setBook] = useState({name:'',author:'',isbn:'',category:'',book_depository_stars:'',image:''});
    const {addbook,deletereq,updateStatus} = useContext(AuthContext);
    const { addToast } = useToasts();

    useEffect(()=>{
        if(location.state!=null)
        setBook({name:location.state.name,author:location.state.author});
        
    },[])
    
    const formsubmit=(props)=>{
      // props.preventDefault();
      console.log(location);
        addbook(book);
        if(location.state!=null)
        updateStatus(location.state._id,'approved')
        addToast('Book added succesfully', { appearance: 'success' });
        
        setBook('');
    }

    return(
        <>
        <div className="edges">
        <BooksNav name="Add Book" />
        <div className='main' style={{boxShadow: '0 0 11px rgba(33,33,33,.2)'}}>
       
        <div class="container"  style={{boxShadow:"none"}}>
    <div class="title">Book details</div>
    <div class="content">
      <form onSubmit={formsubmit}>
        
        <div class="user-details">
        <img src={require("../../css/Add-pic.png")} alt="" className="add" />
          <div class="input-box">
            <span class="details">Book Name</span>
            <input type="text"  
            autoComplete='off'
            onChange={(e)=>setBook({...book,name:e.target.value})}
            value={book.name}
            required />
          </div>
          <div class="input-box">
            <span class="details">Author</span>
            <input type="text"
            autoComplete='off'
            onChange={(e)=>setBook({...book,author:e.target.value})}
            value={book.author}
              required />
          </div>
          <div class="input-box">
            <span class="details">Isbn</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,isbn:e.target.value})}
            value={book.isbn}
             required />
          </div>
          <div class="input-box">
            <span class="details">Category</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,category:e.target.value})}
            value={book.category}
             required />
          </div>
          <div class="input-box">
            <span class="details">Rating</span>
            <input type="text"
            autoComplete='off'
            onChange={(e)=>setBook({...book,book_depository_stars:e.target.value})}
            value={book.book_depository_stars}
              required />
          </div>
          <div class="input-box">
            <span class="details">Book Image</span>
            <input type="text" 
            autoComplete='off'
            onChange={(e)=>setBook({...book,image:e.target.value})}
            value={book.image}
             required />
          </div>
        </div>
       
        <div class="button">
          <input type="submit" value="Submit" />
        </div>
      </form>
      
  </div>
</div>
</div>
</div>

        </>
    )
}