var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var xslt = require('node_xslt');

var fs = require('fs')

var router = express();
var server = http.createServer(router);

router.use(express.static(__dirname));
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.get('/', function(req, res) {
  res.sendFile('index.html');
});

// TABLE TRANSFORMATION
router.get('/test', function(req, res) {
  var xslt = require("node_xslt");
  var xml = xslt.readXmlFile('./me.xml');
  var xsl = xslt.readXsltFile('./me.xsl');
  res.send(xslt.transform(xsl, xml, []));
});

//get for xml info on index.html from indexInfo.xsl
router.get('/test2', function(req, res) {
  var xslt = require("node_xslt");
  var xml = xslt.readXmlFile('./indexInfo.xml');
  var xsl = xslt.readXsltFile('./indexInfo.xsl');
  res.send(xslt.transform(xsl, xml, []));
});

// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {

  // Read in XML and XSL files
  var stylesheet = xslt.readXsltFile('me.xsl');
  var doc = xslt.readXmlFile('me.xml');

  // Apply transformation
  var result = xslt.transform(stylesheet, doc, []);

  // Render the result
  res.send(result);

});

//RSS
router.get('/rss', function(req, res) {
  var Feed = require('feed');
  var feed = new Feed({
    title: 'DGSrss | The latest entertainment news from around the world!!',
    description: 'This is a live feed of the latest movie releases, TV show releases, game releases and much more from the entertainment world!!',
    link: 'https://testweb-shambo.c9users.io',
    image: 'http://example.com/image.png',
    copyright: 'All rights reserved 2015',

  });
  feed.item({
    title: 'Latest Movie Releases!',
    link: 'http://www.imdb.com/movies-in-theaters/',
    description: 'These are the latest movie releases that are in cinemas near you right now!',

  });
  feed.item({
    title: 'Latest and upcoming TV show Releases!!',
    link: 'http://when-will.net/tv-series.html',
    description: 'These are the latest TV show releases that are available right now!',

  });
  feed.item({
    title: 'Latest Game Releases!',
    link: 'http://www.gamespot.com/new-games/',
    description: 'These are the latest game releases that are available right now!',

  });
  feed.item({
    title: 'Is John Snow coming back??',
    link: 'http://www.wired.com/2015/11/game-of-thrones-jon-snow-poster/',
    description: 'The latest Game of Thrones poster has left us with a glimmer of hope for the return of John Snow!',

  });
  feed.item({
    title: 'Check out the latest Battlefront mod!',
    link: 'http://www.gamespot.com/articles/star-wars-battlefront-mod-makes-graphics-look-even/1100-6432563/',
    description: 'This new mod bring us the closest yet to movie quality gaming!!',

  });
  res.send(cleanRSS(feed.render('rss-2.0')));
});
var cleanRSS = function(xml) {
  return xml.replace(/<content:encoded\/>/g, '');
};

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('me.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into game array within the JSON file    
    JSONparsed.game.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('me.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser("catalog", JSONformated);

    // Write the resulting XML back to the system
    fs.writeFileSync('me.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  console.log(req.body);
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});


// CART JSON FILE
router.post('/cart', function(req, res) {
  function appendJSON(obj) {
    var cartJSON = JSON.stringify(obj);
    fs.writeFileSync('Cart.json', cartJSON);
  }
  console.log(req.body);
  appendJSON(req.body);
});



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

