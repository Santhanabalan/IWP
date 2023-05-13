const express = require('express');
const path = require('path');

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'IwpProject';

const client = new MongoClient(uri);

// Connect to database
client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
  }
});

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'about.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in database
  const db = client.db(dbName);
  const collection = db.collection('users');
  const user = await collection.findOne({ username });

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.redirect('/');
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'register.html'));
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password , number, email,repass } = req.body;

  // Hash password
  if (password00!=repass){
    console.log("Password are not similar");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to database
  const db = client.db(dbName);
  const collection = db.collection('users');
  await collection.insertOne({ username, password: hashedPassword, number: number, email:email });

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
