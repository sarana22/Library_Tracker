const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

const seedBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publisher: 'Scribner',
    isbn: '9780743273565'
  },
  {
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    isbn: '9780451524935'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publisher: 'J.B. Lippincott & Co.',
    isbn: '9780061120084'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publisher: 'T. Egerton',
    isbn: '9780141439518'
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    publisher: 'Harper & Brothers',
    isbn: '9780142437247'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publisher: 'Little, Brown and Company',
    isbn: '9780316769488'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    publisher: 'Chatto & Windus',
    isbn: '9780060850524'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    publisher: 'George Allen & Unwin',
    isbn: '9780547928227'
  },
  {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    publisher: 'Ballantine Books',
    isbn: '9781451673319'
  },
  {
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    publisher: 'Smith, Elder & Co.',
    isbn: '9780141441146'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Atlas connected for seeding');

    await Book.deleteMany();
    await Book.insertMany(seedBooks);

    console.log('Books seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();