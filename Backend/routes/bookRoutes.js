const express = require('express');
const router = express.Router();

let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    isbn: '9780743273565',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    isbn: '9780451524935',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publisher: 'J.B. Lippincott & Co.',
    isbn: '9780061120084',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publisher: 'T. Egerton',
    isbn: '9780141439518',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 5,
    title: 'Moby-Dick',
    author: 'Herman Melville',
    publisher: 'Harper & Brothers',
    isbn: '9780142437247',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publisher: 'Little, Brown and Company',
    isbn: '9780316769488',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 7,
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publisher: 'Chatto & Windus',
    isbn: '9780060850524',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 8,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publisher: 'George Allen & Unwin',
    isbn: '9780547928227',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 9,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    publisher: 'Ballantine Books',
    isbn: '9781451673319',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  },
  {
    id: 10,
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    publisher: 'Smith, Elder & Co.',
    isbn: '9780141441146',
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  }
];

router.get('/', (req, res) => {
  res.json(books);
});

// List available books
router.get('/available', (req, res) => {
    const availableBooks = books.filter(book => book.status === 'available');
    res.json(availableBooks);
});

// List checked out books
router.get('/checked-out', (req, res) => {
    const checkedOutBooks = books.filter(book => book.status === 'checked out');
    res.json(checkedOutBooks);
});

// Add a new book
router.post('/', (req, res) => {
  const { title, author, publisher, isbn } = req.body;

  if (!title || !author || !publisher || !isbn) {
    return res.status(400).json({ message: 'All book fields are required.' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    publisher,
    isbn,
    status: 'available',
    checkedOutBy: '',
    dueDate: null
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Check out a book
router.patch('/checkout/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { checkedOutBy, dueDate } = req.body;
    const book = books.find(b => b.id === bookId);
    if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (book.status === 'checked out') {
    return res.status(400).json({ message: 'Book is already checked out.' });
  }

  if (!checkedOutBy || !dueDate) {
    return res.status(400).json({ message: 'checkedOutBy and dueDate are required.' });
  }

  book.status = 'checked out';
  book.checkedOutBy = checkedOutBy;
  book.dueDate = dueDate;

  res.json(book);
});

// Check in a book
router.patch('/checkin/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (book.status === 'available') {
    return res.status(400).json({ message: 'Book is already checked in.' });
  }

  book.status = 'available';
  book.checkedOutBy = '';
  book.dueDate = null;

  res.json(book);
});

module.exports = router;