import '../css/infocard.css';
export const InfoCard=(props)=>{
    return(
        <>
        <div className="contain" style={{backgroundColor:'white',boxShadow: '0 0 11px rgba(33,33,33,.2)'}}>
            <div className="icon-div" style={{backgroundImage:props.color}}>
                <div className='icons'>
                { props.icon }
                </div>
                </div>
                <h1>{props.data}</h1>
            <h6 style={{color:'grey'}}>{props.heading}</h6>
        </div>
        </>
    )
}