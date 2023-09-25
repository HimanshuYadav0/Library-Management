// BookViewer.js
import React, { useEffect } from 'react';

export const BookViewer = ({ volumeId, onClose }) => {
  useEffect(() => {
    // Listen for the "Esc" key press to close the viewer
    const handleEscKeyPress = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [onClose]);

  return (
    <div className="book-viewer">
      <iframe
        title="Book Viewer"
        src={`https://books.google.com/books?id=${volumeId}&lpg=PP1&pg=PP1&output=embed`}
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};


