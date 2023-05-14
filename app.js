const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'IwpProject';

const client = new MongoClient(uri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'error.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const db = client.db(dbName);
  const collection = db.collection('users');
  const user = await collection.findOne({ username });
  if(user!=null){
  const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.redirect('/');
    }
  } 
  else {
    res.redirect('/error');
  }
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'register.html'));
});

app.post('/register', async (req, res) => {
  const { username, password , number, email,repass } = req.body;

  if (password!=repass){
    res.redirect('/error');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = client.db(dbName);
  const collection = db.collection('users');
  await collection.insertOne({ username, password: hashedPassword, number: number, email:email });

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
