
var restify = require('restify');
var http = require('http');
var request = require("request")

var ur = "http://api.angel.co/1/tags/93839/startups";

function respond(req, res, next) {

var limit = req.params.limit;
var tag = req.params.name;
var url = "http://api.angel.co/1/tags/"+tag+"/startups/?per_page="+limit;



request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
	res.send(  body);
        //return body;
    }
    else console.log("error" + error)
})



//  res.send('hello ' + url +  ' '  + req.params.name + JSON.stringify(tagParse(url) ));
  next();
}
var server = restify.createServer();
server.get('/hello/:name/:limit', respond);
server.head('/hello/:name/:limit', respond);
server.use(restify.fullResponse())
  .use(restify.bodyParser())
server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
