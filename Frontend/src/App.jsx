import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCheckOut = async (id) => {
    await axios.patch(`http://localhost:5000/api/books/checkout/${id}`, {
      checkedOutBy: "Sarahana",
      dueDate: "2026-04-20"
    });
    fetchBooks();
  };

  const handleCheckIn = async (id) => {
    await axios.patch(`http://localhost:5000/api/books/checkin/${id}`);
    fetchBooks();
  };

  const availableBooks = books.filter(book => book.status === 'available');
  const checkedOutBooks = books.filter(book => book.status === 'checked out');

  return (
    <div className="container">
      <h1>Library Tracker</h1>

      <section>
        <h2>Available Books</h2>
        {availableBooks.length === 0 ? (
          <p>No available books.</p>
        ) : (
          availableBooks.map(book => (
            <div key={book.id} className="card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.status}</p>
              <button onClick={() => handleCheckOut(book.id)}>
                Check Out
              </button>
            </div>
          ))
        )}
      </section>

      <section>
        <h2>Checked Out Books</h2>
        {checkedOutBooks.length === 0 ? (
          <p>No checked out books.</p>
        ) : (
          checkedOutBooks.map(book => (
            <div key={book.id} className="card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.status}</p>
              <p>Checked Out By: {book.checkedOutBy || "N/A"}</p>
              <p>Due Date: {book.dueDate || "N/A"}</p>
              <button onClick={() => handleCheckIn(book.id)}>
                Check In
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;