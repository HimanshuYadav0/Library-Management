import { BooksNav } from "../components/books/bookNav";
import "../css/requuestBook.css";
import { AuthContext } from "../context/authProvider";
import { useContext ,useEffect,useState} from "react";
import { useToasts } from 'react-toast-notifications';

export const RequestBook = () => {
  const{requestbook,requestStatus,getStatus} = useContext(AuthContext)

  const[names,setNames]=useState('');
  const[author,setAuthor]=useState('');
  const { addToast } = useToasts();

  const handleReq=async(props)=>{
    if(names=='' || author=='')addToast('Please fill all the details', { appearance: 'warning' });
    else{
    requestbook(names,author)
    addToast('Book requested successfully', { appearance: 'success' });
    }
  }
  useEffect(()=>{
    getStatus();
  },[])

  const list = requestStatus.map((val,index)=>
  <>

    <tr>
      <th scope="row">{index+1}</th>
      <td>{val.name}</td>
      <td>{val.author}</td>
      <td className={val.status==='Approved'?'approved':val.status==='Rejected'?'rejected':'pending'}>{val.status}</td>
    </tr>
  
  </>
  )

  return (
    <>
      <div className="edges">
        <BooksNav name="Request Book" />
        <div className="main">
          {/* <div className='request-form'> */}
          <form onSubmit={handleReq} className="req-form">
            <div class="row g-3 align-items-center">
              <div class="col-auto">
                <label for="bookName" class="col-form-label bookLabel">
                  Book Name
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="text"
                  id="bookName"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                  onChange={(e)=>setNames(e.target.value)}
          value={names}
                />
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-auto">
                  <label for="authorName" class="col-form-label bookLabel">
                    Author's Name
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    id="authorName"
                    class="form-control"
                    aria-describedby="passwordHelpInline"
                    onChange={(e)=>setAuthor(e.target.value)}
          value={author}
                  />
                  
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary submitBtn" style={{backgroundColor:'#FF725E',borderColor:'#FF725E'}}>
              Submit
            </button>
            </form>
                      <div className='request-form'>

            <img className='reqbook' src={require('../css/reqbook.png')} />

          </div>
          {list.length>0?<div className="list">
          <h3>Requested books </h3>
          <table class="table table-hover t-edit">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Book Name</th>
      <th scope="col">Author</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
            {list}
            </tbody>
</table></div>:null}
        </div>
      </div>
      
    </>
  );
};
