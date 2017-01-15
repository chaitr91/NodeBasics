var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

var server = http.createServer(function(request, response) {
  var filePath = false;
console.log("I m inside the server"+request);
  if (request.url =='/') {
	  console.log("MMMM");
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
  
  //response.write("OMG");
});

var port_number = server.listen(process.env.PORT || 3000);


function sendPage(response, filePath, fileContents) {
	console.log("Sending PAGE");
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  console.log("Send========");
  response.end(fileContents);
}

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function serverWorking(response, absPath) {

console.log("serverWorking");
  fs.exists(absPath, function(exists) {
	  console.log("Exists is true");
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response);
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}
