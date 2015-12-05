var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var xslt = require('node_xslt');


=======
var fs = require('fs')
>>>>>>> 5ef2a21322ff1b86a011e6aa0ba8673df6ef4ae8
var router = express();
var server = http.createServer(router);

router.use(express.static(__dirname));
router.use(bodyParser.urlencoded({ extended: true }));
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
  function appendJSON(obj){
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
