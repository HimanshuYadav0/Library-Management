import React, { createContext, useState, useReducer, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext({});


const getdate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
}
const returndate = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);
    var dd = targetDate.getDate();
    var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
    var yyyy = targetDate.getFullYear();

    var dateString = `${dd}/${mm}/${yyyy}`;
    return dateString
}

// const BookReducer = (state,action)=>{
//     switch(action.type){
//         case 'get_books':
//             console.log(action.payload);
//             return action.payload

//         default:
//             return state;
//     }
// }

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [issue, setIssue] = useState([]);
    const [entertainment, setEntertainment] = useState([]);
    const [humour, setHumour] = useState([]);
    const [biography, setBiography] = useState([]);
    const [poetry, setPoetry] = useState([]);
    const [art, setArt] = useState([]);
    const [returned, setReturned] = useState([]);
    const [results, setResults] = useState([]);
    const [role, setRole] = useState(sessionStorage.getItem('role'));
    const [requested, setRequested] = useState([]);
    const [fine, setFine] = useState(0);
    const [requestStatus, setRequestStatus] = useState([]);
    const [user, setUser] = useState({});
    const [allbooks, setAllBooks] = useState([]);
    // const [books,dispatch] = useReducer(BookReducer,[])
    const update = () => {

    }



    const getIssueBooks = async () => {
        try {
            const response = await axios.get('/api/getissuebooks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


            setIssue(response.data);
        }
        catch (e) {
            console.log(e.response);
        }
    }

    const getBooks = async (id) => {

        try {
            const response = await axios.get(`/api/searchm/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            //   dispatch({type:'get_books',payload:response.data})

            if (id === 'Entertainment') {
                setEntertainment(response.data);
            }
            else if (id === 'Humour') {
                setHumour(response.data);
            }
            else if (id === 'Biography') {
                setBiography(response.data);
            }
            else if (id === 'Poetry-Drama') {
                setPoetry(response.data);
            }
            else if (id === 'Art-Photography') {
                setArt(response.data);
            }
            else {
                setResults(response.data);
            }

        }
        catch (e) {
            console.log(e.response);
        }
    }



    const issueBooks = async (Book) => {
        try {
            await axios.post('/api/issued-books', JSON.stringify({ Name: Book.name, image: Book.image, author: Book.author, isbn: Book.isbn, IssuedOn: getdate(), returnDate: returndate() }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

        }
        catch (e) {
            console.log(e.response);
        }
    }
    const getStatus = async () => {
        try {
            const response = await axios.get('/api/requestedBooks-status',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setRequestStatus(response.data);
        }
        catch (e) {
            console.log(e.response);
        }
    }

    // const returnBooks=async(Book)=>{
    //     try{
    //         await axios.post('/returned-books',JSON.stringify({Name:Book.Name,author:Book.author,isbn:Book.isbn,issuedOn:Book.IssuedOn,returnedOn:'1'}),
    //         {
    //             headers:{
    //             Authorization:`Bearer ${token}`}
    //           })
    //     }
    //     catch(e){
    //         console.log(e.data);
    //         console.log(e);
    //     }
    // }

    const getReturnBooks = async () => {
        try {
            const response = await axios.get('/api/getreturnbooks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setReturned(response.data);

        }
        catch (e) {
            console.log(e.response);
        }
    }

    const deleteIssue = async (isbn) => {

        try {
            await axios.post(`/api/delete-issue/`, JSON.stringify({ isbn }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        }
        catch (e) {
            console.log(e.response);
        }
    }

    const requestbook = async (bookName, author) => {
        console.log(bookName, author);
        try {
            await axios.post('/api/request', JSON.stringify({ bookName, author }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    const searchbook = async (option, search) => {
        try {
            console.log(option);
            const response = await axios.get(`/api/searchm/${option}/${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setResults(response.data);
            console.log("results = " + response.data);
        }
        catch (e) {
            console.log("results = " + results);
            console.log(e);
        }
    }

    const getRequestedBooks = async () => {
        try {
            const response = await axios.get('/api/getrequest', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setRequested(response.data)
        }
        catch (e) {
            console.log(e);
        }
    }

    const deletereq = async (book) => {
        try {
            await axios.post('/api/deletereq', JSON.stringify({ name: book.name }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const addbook = async (book) => {
        try {
            await axios.post('/api/addbook', JSON.stringify({ image: book.image, name: book.name, isbn: book.isbn, author: book.author, category: book.category, book_depository_stars: book.book_depository_stars }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            console.log("check");

        }
        catch (e) {
            console.log(e);
        }
    }

    const getFine = async () => {
        try {
            const response = await axios.get('/api/getfine', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFine(response.data[0].fine);
            console.log(response.data[0].fine);
        }
        catch (e) {
            console.log(e.response.data);
        }
    }

    const deleteBook = async (isbn) => {
        try {
            const response = await axios.post('/api/deletebook', JSON.stringify({ isbn }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    const updateStatus = async (key, option) => {
        try {
            const response = await axios.post(`/api/updatestatus/${key}/${option}`, JSON.stringify({ key }), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e.response.data);
        }
    }

    const UpdateBook = async (Book) => {
        try {
            const response = await axios.post(`/api/updateBook`, JSON.stringify(Book), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <AuthContext.Provider value={{
            token, getIssueBooks, setIssue,
            issue, entertainment, biography, humour, poetry
            , art, getBooks, issueBooks, getReturnBooks, returned
            , deleteIssue, requestbook, results, searchbook, role
            , getRequestedBooks, requested, deletereq, addbook
            , getFine, fine, deleteBook, setToken, setRole, update, role,
            getStatus, requestStatus, updateStatus, UpdateBook, user, setUser
        }}>{children}</AuthContext.Provider>
    )
}