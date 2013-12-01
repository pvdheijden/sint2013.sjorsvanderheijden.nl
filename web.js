var _ = require("underscore");
var async = require("async");

var express = require("express");

var app = express();
app.configure(function() {
	app.use(express.logger("default"));
	
	app.use(express.bodyParser());
	
	app.set('view engine', 'html');
	app.engine('html', require('hbs').__express);
	app.set("views", __dirname + "/views", { maxAge: 3600000 });
	app.use(express.static(__dirname + "/static", { maxAge: 365 * 86400000 }));
	
	app.use(express.compress());
	
	app.use(app.router);
});

var questions = [
{
  title: "Ken je zelf!",
  subtitle: " ... of hoe andere jou denken te kennen",
  imageURL: "/photo-1.jpg",
  question: "Wie staat hier op de foto?",
  answerKeywords: [
    { tag: "sjors" }
  ],
  hint: "Deze is te makkelijk, voor deze is geen hint beschikbaar!",
  nextURL: "/questions/1"
},
{
  title: "XXX Ken je zelf!",
  subtitle: " ... of hoe andere jou denken te kennen",
  imageURL: "/photo-1.jpg",
  question: "Wie staat hier op de foto?",
  answerKeywords: [
    { tag: "sjors" }
  ],
  hint: "Deze is te makkelijk, voor deze is geen hint beschikbaar!",
  nextURL: "/questions/2"
}
];

app.get("/", function(request, response) { 
  response.redirect("/questions/0");
});

app.get("/questions/:id", function(request, response) {
  var id = request.params.id;
  
  response.render("question", questions[id]);
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
