import axios from 'axios';

export default axios.create({
    baseURL:'https://libr-fcjr.onrender.com/',
    headers:{
        'Content-Type':'application/json',
    },
        withCredentials:false
})