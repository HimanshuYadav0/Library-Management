import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BooksNav } from "../components/books/bookNav"
import { AuthContext } from "../context/authProvider";
import '../css/booksdetails.css';
import { useToasts } from 'react-toast-notifications';
import axios from "../api/axios";

export const BookDetail=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const {issueBooks,issue,token,role,getIssueBooks,deleteBook} = useContext(AuthContext);
    const [btnValue,setBtnValue] = useState('Loading..');
    const [btnColor,setBtnColor] = useState('buy--btn');
    const { addToast } = useToasts();
    const [copies,setCopies] = useState(true);

    useEffect( async ()=>{
        await getIssueBooks();
        
        const response = await axios.get(`/search/isbn/${location.state.data.isbn}`,{
            headers:{
            Authorization:`Bearer ${token}`}
          })
          console.log(response.data[0].copies);
          if(response.data[0].copies<1){
              setBtnValue('Not available');
              setBtnColor('btn-secondary disabled');
            }
          else{
          let flag=0;
         
          issue.every(book=>{
              if(book.isbn==location.state.data.isbn){
                  flag=1;
                  return false;
              }
              return true
          }) 
          if(flag==1){
              setBtnColor('btn--change');
              setBtnValue('Issued');
          }
          else{
              setBtnValue("Issue Book")
          }
        }
        
    },[])

    const btnHandle=()=>{
        // console.log(issue.length);
        
        if(btnValue=='Issued'){
            addToast('Book is already issued',{ appearance: 'error' });
        }
         if(issue.length==5){
             addToast('You can issue maximum of 5 books',{appearance:'warning'});
             
         }
        else if(btnValue=='Not available')addToast('Book is not available at this moment try after sometime',{appearance:'error'})
        else{
        issueBooks(location.state.data);
        setBtnValue('Issued');
        setBtnColor('btn--change');
        }
        
    }

    const deletebtn=async (isbn)=>{
        const response = await deleteBook(isbn);
        navigate('/home/books');
        console.log(response);
        if(response === "Book is currently issued")
        addToast(response,{ appearance: 'error' });
        else addToast(response,{ appearance: 'success' });

    }
    return(
        <>
        <div className="edges">
            <BooksNav name='Book details'/>
        <div className="main">
        {/* <h1>Book name</h1>
        <h1>Book details</h1> */}
        <section class="product">	
			<div class="photo-main">
				<img class='photo'src={location.state.data.image} />
			</div>
	<div class="product__info">
		<div class="title">
			<h1>{location.state.data.name}</h1>
			<span>{location.state.data.author}</span>
		</div>
		
        <h3 className="headings">Details</h3>
		<div class="description">
			
				<p><span className='titles'>Language &nbsp;-</span>  English</p>
				<p><span className='titles'>Publisher&nbsp; -</span> Berkley Books</p>
				<p><span className='titles'>ISBN&nbsp; -</span>{location.state.data.isbn}</p>
				<p><span className='titles'>Rating &nbsp;-</span>{location.state.data.book_depository_stars}</p>
                <p><span className='titles'>category &nbsp;-</span>{location.state.data.category}</p>
			
		</div>
        {role==='user'?
		<button onClick={btnHandle} class={(btnValue=='Not available'?"btn btn-secondary disabled":btnColor)}>{btnValue}</button>:<>
          <button onClick={()=>navigate('/home/update-book',{state:location.state.data})}  class='buy--btn me-3 ms-4'>Update Book</button>
        <button onClick={()=>deletebtn(location.state.data.isbn)} class='buy--btn'>Delete Book</button>
              </>}

        
	</div>
</section>

        </div>
        </div>
        </>
    )
}