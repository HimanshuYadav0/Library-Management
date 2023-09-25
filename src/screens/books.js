import '../css/books.css';
import { BooksNav } from '../components/books/bookNav';
import { CardsPanel } from '../components/books/cardsPanel';
import { AuthContext } from '../context/authProvider';
import { useContext, useEffect } from 'react';
export const Books = () => {

    const { entertainment, biography, humour, poetry, art, setResults, getBooks } = useContext(AuthContext);

    useEffect(async () => {

        await getBooks('Entertainment');
        await getBooks('Humour');
        await getBooks('Biography');
        await getBooks('Poetry-Drama');
        await getBooks('Art-Photography');


        return () => {
            console.log("loaded");
        }

    }, [])

    return (
        <div className="edges">
            <BooksNav name="Books" />
            <div className='main' style={{ boxShadow: '0 0 11px rgba(33,33,33,.2)' }}>
                <CardsPanel data={entertainment} />
                <CardsPanel data={biography} />
                <CardsPanel data={humour} />
                <CardsPanel data={poetry} />
                <CardsPanel data={art} />
            </div>
        </div>
    )
}