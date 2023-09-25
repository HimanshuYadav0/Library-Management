import React, { useEffect, useState } from 'react';
import { BooksNav } from '../components/books/bookNav';
import  RingLoader from 'react-spinners/RingLoader';


export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [books, setBooks] = useState([]); // State to store the fetched books
  const [page, setPage] = useState(1); // Track the current page
  const itemsPerPage = 10; // Number of books to fetch per page
  const [isLoading, setIsLoading] = useState(false); // Track if a fetch request is already in progress

  function showLoadingAnimation() {
    document.getElementById('loading-animation').style.display = 'flex';
  }

  // Function to hide the loading animation
function hideLoadingAnimation() {
    document.getElementById('loading-animation').style.display = 'none';
  }

  const fetchBooks = () => {
    if (isLoading) return;
    showLoadingAnimation();
    const apiKey = 'AIzaSyClEkfDXlmPd6YmzhFEIzRMteasNHZHWJ4'; // Replace with your Google Books API key

    let apiUrl = '';

    if (searchTerm) {
      apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${(page - 1) * itemsPerPage}&maxResults=${itemsPerPage}&key=${apiKey}`;
    } else {
      apiUrl = `https://www.googleapis.com/books/v1/volumes?q=&startIndex=${(page - 1) * itemsPerPage}&maxResults=${itemsPerPage}&key=${apiKey}`;
    }

    setIsLoading(true);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const newBooks = data.items || [];

        if (newBooks.length > 0) {
          setBooks(prevBooks => [...prevBooks, ...newBooks]);
          setPage(prevPage => prevPage + 1);
        } else {
          // Handle no books found
        }

        setIsLoading(false);

       
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      });
  };

  const handleSearchClick = () => {
    setPage(1);
    setBooks([]);
    fetchBooks();
  };

  useEffect(() => {
    // Attach the Intersection Observer to the trigger element
    const triggerElement = document.getElementById('infinite-scroll-trigger');
    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        fetchBooks();
      }
    };
    const observer = new IntersectionObserver(handleIntersection, { rootMargin: '0px', threshold: 0.1 });

    if (triggerElement) {
      observer.observe(triggerElement);
    }
  }, []);

  useEffect(() => {
    // Fetch books when the page loads
    fetchBooks();
  }, []);

  return (
    <>
      <div className="edges">
        <BooksNav name="Dashboard" />

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearchClick}>Search</button>
        </div>

        <div id="book-list">
          {/* Render the list of books */}
          <h2>Books</h2>
          <div className="row">
            {books.map((book) => (
              <div key={book.id} className="col-lg-2 col-md-3 col-sm-4 mb-3">
                <div className="card">
                  <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'no-image.jpg'} className="card-img-top" alt={book.volumeInfo.title} />
                  <div className="card-body">
                    <h5 className="card-title">{book.volumeInfo.title}</h5>
                    <p className="card-text">Author(s): {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
        </div>
                
        {/* Loading animation */}
        <div id="loading-animation" className={`rainbow-loader ${isLoading ? 'visible' : 'hidden'}`}>
          <RingLoader color="red" size={100} /> {/* Customize the color and size */}
        </div>
        

        {/* Infinite scroll trigger */}
        <div id="infinite-scroll-trigger" style={{ height: '1px' }}></div>
      </div>
    </>
  );
};
