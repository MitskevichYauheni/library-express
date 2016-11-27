var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Photo = require('./models/photo');


mongoose.connect('mongodb://localhost:27017/library')

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/photo', function(req, res){
  var tagsString = req.body.tags;
  var tags = tagsString.split(',');
  tags.map(function(tag, index) {
     tags[index] = tag.trim();
  })

  Photo.create({ src: req.body.src, tags: tags }, function(err, photo) {
    if(err){
      console.log(err);
    } else {
      res.send(photo);
    }
  })
})

app.get('/photo', function(req, res){
  Photo.find({}, function(err, photos) {
    if(err){
      console.log(err);
    } else {
      photos.map(function(photo){
        res.write(photo.src + '\n');
        res.write('linkes: ' +  photo.likes + '\n')
      })
      res.end();
    }
  })
})

app.post('/photo/likes', function(req, res){
  Photo.findOne({ src: req.body.src }, function(err, photo) {
    if(err){
      console.log(err);
    } else {
      photo.likes++;
      photo.save(function(err) {
        if(err){
          res.rend(err);
        } else {
          res.send('updated');
        }
      })
    }
  })
})

app.post('/photo/un-likes', function(req, res){
  var tageString = req.body.tags;
  var tags = [];

  Photo.findOne({ src: req.body.src }, function(err, photo) {
    if(err){
      console.log(err);
    } else {
      photo.likes--;
      photo.save(function(err) {
        if(err){
          res.rend(err);
        } else {
          res.send('updated');
        }
      })
    }
  })
})


app.get('/', function(req, res){
  res.send('Hello in browser')
})

app.listen(3000, function() {
  console.log('Server is up!');
});
