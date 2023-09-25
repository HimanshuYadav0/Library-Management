import { AuthContext } from "../../context/authProvider";
import { useContext } from "react";
import { Card } from "../cards";
import { BooksNav } from "./bookNav";
import { Bars, Oval, TailSpin } from  'react-loader-spinner'

export const SearchBook=()=>{
    
    const{results} = useContext(AuthContext);
    console.log(results);
    const searchList = results.map((book)=>
    <Card data={book}
            />)
    return(
        <>
        <div className="edges">
        <BooksNav name="Books" />
        <div className='main' style={{boxShadow: '0 0 11px rgba(33,33,33,.2)'}}>
        
        {results.length==0?<img src={require('../../css/no-data.png')} style={{width:'500px',height:'500px'}}/>:<div className="row search">{searchList}</div>}
        
            </div>
            </div>
        </>
    )
}