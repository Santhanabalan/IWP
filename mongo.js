const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017/mydb';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log('Database created!');
  const dbo = db.db('mydb');
  dbo.createCollection('mycollection', function(err, res) {
    if (err) throw err;
    console.log('Collection created!');
    db.close();
  });
});
