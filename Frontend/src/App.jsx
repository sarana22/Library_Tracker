import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [checkedOutBy, setCheckedOutBy] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');

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

  const handleCheckIn = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/books/checkin/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error checking in book:', error);
    }
  };

  const openCheckoutForm = (id) => {
    setSelectedBookId(id);
    setCheckedOutBy('');
    setDueDate('');
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (!checkedOutBy || !dueDate) {
      alert('Please fill in both checkout fields.');
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/api/books/checkout/${selectedBookId}`, {
        checkedOutBy,
        dueDate
      });

      setSelectedBookId(null);
      setCheckedOutBy('');
      setDueDate('');
      fetchBooks();
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!title || !author || !publisher || !isbn) {
      alert('Please fill in all book fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/books', {
        title,
        author,
        publisher,
        isbn
      });

      setTitle('');
      setAuthor('');
      setPublisher('');
      setIsbn('');
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const availableBooks = books.filter(book => book.status === 'available');
  const checkedOutBooks = books.filter(book => book.status === 'checked out');

  return (
    <div className="container">
      <h1>Library Tracker</h1>

      <div className="form-box">
        <h2>Add New Book</h2>
        <form onSubmit={handleAddBook}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>

            <div className="form-group">
              <label>Publisher</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Enter publisher"
              />
            </div>

            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Enter ISBN"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">Add Book</button>
          </div>
        </form>
      </div>

      {selectedBookId && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Check Out Book</h2>
      <form onSubmit={handleCheckoutSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Checked Out By</label>
            <input
              type="text"
              value={checkedOutBy}
              onChange={(e) => setCheckedOutBy(e.target.value)}
              placeholder="Enter borrower name"
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Submit Checkout
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setSelectedBookId(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      <section>
        <h2 className="section-title">Available Books</h2>
        {availableBooks.length === 0 ? (
          <p className="empty-text">No available books.</p>
        ) : (
          <div className="books-grid">
            {availableBooks.map(book => (
              <div key={book._id} className="card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Status:</strong> {book.status}</p>
                <div className="form-actions">
                  <button
                    className="primary-btn"
                    onClick={() => openCheckoutForm(book._id)}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title">Checked Out Books</h2>
        {checkedOutBooks.length === 0 ? (
          <p className="empty-text">No checked out books.</p>
        ) : (
          <div className="books-grid">
            {checkedOutBooks.map(book => (
              <div key={book._id} className="card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Status:</strong> {book.status}</p>
                <p><strong>Checked Out By:</strong> {book.checkedOutBy || 'N/A'}</p>
                <p><strong>Due Date:</strong> {book.dueDate ? new Date(book.dueDate).toLocaleDateString() : 'N/A'}</p>
                <div className="form-actions">
                  <button
                    className="checkin-btn"
                    onClick={() => handleCheckIn(book._id)}
                  >
                    Check In
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;