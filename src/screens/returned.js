import { BooksNav } from "../components/books/bookNav"
import { AuthContext } from "../context/authProvider";
import { useContext,useEffect } from "react";
import '../css/returned.css'

export const Returned=()=>{
    const {getReturnBooks,returned} = useContext(AuthContext);

    useEffect(async()=>{
        await getReturnBooks();
      })

   const returnList = returned.map((book,index)=>
   <div class="service">
      <div class="flip-box">
        <div class="flip-box-inner">
          <div class="flip-box-front">
          <img className='images' src={book.image}/>
          </div>
          <div class="flip-box-back">
            <p>Issued On  {book.IssuedOn}</p>
            <p>Due Date {book.dueDate}</p>
            <p>Returned on  {book.returnedOn}</p>
            <p>Fine - ${book.fine}</p>

          </div>
        </div>
      </div>
    </div>
   )
      
      return(
        <div className="edges">
       <BooksNav name="Returned Books" />

         {returned.length==0?<div className="main"><img src={require('../css/no-data.png')} style={{width:'500px',height:'500px'}}/></div>:<>
      
<div className="row"> {returnList}</div>

         </>}
</div>

   )
}


    
    


    