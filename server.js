var http = require('http');
var path = require('path');
var express = require('express');
var router = express();
var server = http.createServer(router);

router.use(express.static(__dirname));

router.get('/', function(req, res) {
  res.sendFile('index.html');
});
router.get('/test', function(req, res) {
  var xslt = require("node_xslt");
  var xml = xslt.readXmlFile('./me.xml');
  var xsl = xslt.readXsltFile('./me.xsl');
  res.send(xslt.transform(xsl, xml, []));
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
