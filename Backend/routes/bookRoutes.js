const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// GET available books
router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ status: 'available' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available books' });
  }
});

// GET checked out books
router.get('/checked-out', async (req, res) => {
  try {
    const books = await Book.find({ status: 'checked out' });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching checked out books' });
  }
});

// POST add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, publisher, isbn } = req.body;

    if (!title || !author || !publisher || !isbn) {
      return res.status(400).json({
        message: 'All book fields are required.'
      });
    }

    const newBook = new Book({
      title,
      author,
      publisher,
      isbn
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({
      message: 'Error adding book',
      error: error.message
    });
  }
});

// PATCH check out a book
router.patch('/checkout/:id', async (req, res) => {
  try {
    const { checkedOutBy, dueDate } = req.body;

    if (!checkedOutBy || !dueDate) {
      return res.status(400).json({
        message: 'checkedOutBy and dueDate are required.'
      });
    }

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    if (book.status === 'checked out') {
      return res.status(400).json({
        message: 'Book is already checked out.'
      });
    }

    book.status = 'checked out';
    book.checkedOutBy = checkedOutBy;
    book.dueDate = dueDate;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({
      message: 'Error checking out book',
      error: error.message
    });
  }
});

// PATCH check in a book
router.patch('/checkin/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found.'
      });
    }

    if (book.status === 'available') {
      return res.status(400).json({
        message: 'Book is already checked in.'
      });
    }

    book.status = 'available';
    book.checkedOutBy = '';
    book.dueDate = null;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({
      message: 'Error checking in book',
      error: error.message
    });
  }
});

module.exports = router;