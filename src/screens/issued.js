import '../css/issuecard.css'
import '../css/dashboard.css'
import '../css/issued.css'
import { BooksNav } from '../components/books/bookNav';
import axios from '../api/axios';
import { AuthContext } from '../context/authProvider';
import { useEffect,useContext ,useState} from 'react';
export const Issued=()=>{

   
    const {getIssueBooks,setIssue,issue,deleteIssue} = useContext(AuthContext);
    
    useEffect(async()=>{
      await getIssueBooks();
    })

    const returnbtn=async(book)=>{
      
      await deleteIssue(book.isbn);
     var list = [...issue];
     var index = issue.indexOf(book);
     console.log(`clicked on ${book.Name}`);
     if(index!==-1){
       list.splice(index,1);
        setIssue(list);
     }
    //  await returnBooks(book);
    }
    const issueList = issue.map((book,index)=>
    <tr key={book._id}>
      <th scope="row" >{index+1}</th>
      <td>{book.isbn}</td>
      <td>{book.Name}</td>
      <td>{book.author}</td>
      <td>{book.IssuedOn}</td>
      <td>{book.returnDate}</td>
      <img src={book.image} class="card-img-top" style={{height:'11rem'}}/>
      <td><button onClick={()=>returnbtn(book)} className='btn btn-success'>Return</button></td>

    </tr>)

    return(
         <div className="edges">
        <BooksNav name="Issued Books" />

          {issue.length==0?<div className='main'><img src={require('../css/no-data.png')} style={{width:'500px',height:'500px'}}/></div>:<>
          
    {issue.map((book,index)=>
    <div className=''>
      <div className='wrappers'>
      <div class="issuecard-img">
        <img src={book.image} style={{height:200,width:150,marginTop:0}} />
      </div>
      <div class="issuecard-info" >
        <div class="issuecard-text">
          <h1>{book.Name}</h1>
          <h2>{book.author}</h2>
          <p>Isbn - {book.isbn}<br/>Issued on - {book.IssuedOn}<br /> Return Date - {book.returnDate} </p>
        </div>
      <div class="issuecard-price-btn">
          <button onClick={()=>returnbtn(book)} className='btn btn-success'>Return</button>
      </div>
      </div>
      </div>
      </div>
    )}
  </>}
</div>

    )
}