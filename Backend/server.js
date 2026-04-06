const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Library API is running');
});

app.use('/api/books', bookRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
