var http = require('http');
var path = require('path');
var express = require('express');
var router = express();
var fs = require('fs');
var server = http.createServer(router);
var bodyParser = require('body-parser');

router.use(express.static(__dirname));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.sendFile('index.html');
});
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
