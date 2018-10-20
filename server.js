var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var multer  = require('multer');
var fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
    //cb(null, path.resolve(__dirname, './test'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

const express = require('express');
//const path = require('path');
const app = express();

var cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: false
}

app.use(cors(corsOptions));

app.use(express.json());

//app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'build'));
//});

// Endpoint for all products
app.get('/api/products', cors(corsOptions), (req, res) => {
    
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("products").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  });
  
});

// Endpoint for a specific product
app.get('/api/products/:id', cors(corsOptions), (req, res) => {
  
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection("products").findOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });

});

// Endpoint for creating a product
app.post('/api/products', upload.single('image'), cors(corsOptions), (req, res) => {
  
  var name = req.body.name;
  var price = Number(req.body.price);
  var newProduct = {
      name, price
  };
  
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("products").insertOne(newProduct, function(err, res) {
      if (err) throw err;
      console.log("Document inserted -- " + newProduct.name);
      db.close();
    });
  });

  res.send("Document inserted -- " + newProduct.name);

});

// Endpoint for updating a product
app.put('/api/products/:id', upload.single('image'), cors(corsOptions), (req, res) => {

  var name = req.body.name;
  var price = Number(req.body.price);
  var newProduct = {
    name, price
  };
  var oldName = req.body.oldName;
  
  console.log(oldName + "   --   " + name);

  console.log(req.file);

  if (req.file && name != oldName) {
    console.log('everything was changed - ' + oldName + ' to ' + name + ' and image should be changed');
    fs.unlink('images/' + oldName + '.jpg', err => {
      console.log(err);
    });
  } else {
    console.log('not everything was changed, old name - ' + oldName + ' -name- ' + name + ' .image just renamed');
    fs.rename('images/' + oldName + '.jpg', 'images/' + name + '.jpg', function(err) {
      console.log('Renamed from ' + oldName + '.jpg to ' + name + '.jpg');
      if ( err ) console.log('ERROR: ' + err);
    });
  }

  var ObjectId = require('mongodb').ObjectID;
  let myquery = { _id: new ObjectId(req.params.id) };
  var updatedProduct = newProduct;
  let newValues = { $set: updatedProduct };

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("products").updateOne(myquery, newValues, function(err, res) {
       if (err) throw err;
       console.log("Updated to " + updatedProduct.name + " " + updatedProduct.price);
       db.close();
    });
  });

  res.send("Updated to " + updatedProduct.name + " " + updatedProduct.price);

});

// Endpoint for deleting a product
app.delete('/api/products/:id', cors(corsOptions), (req, res) => {

  var ObjectId = require('mongodb').ObjectID;
  let myquery = { _id: new ObjectId(req.params.id) };  

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("products").findOne({"_id": new ObjectId(req.params.id)}, function(err, result) {
      if (err) throw err;
      let name = result.name;
      fs.unlink('images/' + name + '.jpg', err => {
        console.log(err);
      });
    });

    dbo.collection("products").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("Document deleted -- " + myquery._id);
      db.close();
    });
  });

  res.send("Document deleted -- " + myquery._id);

});
  
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); 
})

const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}...`) );


