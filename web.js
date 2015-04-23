var _ = require("underscore");
var async = require("async");

var express = require("express");

var app = express();
  app.use(express.logger("default"));

  app.use(express.bodyParser());

  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.set("views", __dirname + "/views", { maxAge: 3600000 });
  app.use(express.static(__dirname + "/static", { maxAge: 365 * 86400000 }));

  app.use(express.compress());

  app.use(app.router);

var questions = [
{
  title: "Ken je zelf!",
  subtitle: " ... of hoe andere jou denken te kennen",
  imageURL: "/1-sjors.jpg",
  question: "Wie staat hier op de foto?",
  answerKeywords: [
    { tag: "sjors" }
  ],
  hint: "Deze is te makkelijk, voor deze is geen hint beschikbaar!",
  nextURL: "/questions/1"
},
{
  title: "Hollandse kost",
  subtitle: "gewoon een karbonade, aardappels en spercieboontjes",
  imageURL: "/2-stoofvlees.jpg",
  question: "Is Sjors soms een boer, wat hij niet kent ...",
  answerKeywords: [
    { tag: "eet hij niet" }
  ],
  hint: "Kan me niet voorstellen dat je deze uitdrukking nog nooit hebt gehoord!",
  nextURL: "/questions/2"
},
{
  title: "Tussen de middag, wat anders",
  subtitle: "... heeeel graag zelfs",
  imageURL: "/3-tosti.jpg",
  question: "Wat eet Sjors ALTIJD tussen de middag?",
  answerKeywords: [
    { tag: "kaas tosti" },
    { tag: "kaastosti" },
    { tag: "tosti zonder ham" }
  ],
  hint: "De standaard Sjors lunch is geen gewone tosti maar ...",
  nextURL: "/questions/3"
},
{
  title: "Moet erbij",
  subtitle: "... anders is geen enkele maaltijd compleet",
  imageURL: "/4-ketchup.jpg",
  question: "Zoals hier boven al staat, geen maaltijd is compleet zonder dit!",
  answerKeywords: [
    { tag: "heinz tomatenketchup" }
  ],
  hint: "Er is er maar een de enige echte!",
  nextURL: "/questions/4"
},
{
  title: "Eten, verteren, naar de WC en dan",
  subtitle: "Tja, wat doen je dan?",
  imageURL: "/5-wc.jpg",
  question: "Na naar de WC te zijn geweest moet je ook ... en ...",
  answerKeywords: [
  { tag: "billen afvegen en doortrekken" },
  { tag: "billen afvegen en doorspoelen" }
  ],
  hint: "Niet te geloven dat je hier een hint voor nodig hebt :-)",
  nextURL: "/questions/5"
},
{
  title: "De piano",
  subtitle: "wanneer wordt het concert gegeven?",
  imageURL: "/6-piano.jpg",
  question: "Elke week gaar Sjors naar de pianoles, maar elke dag ...",
  answerKeywords: [
    { tag: "oefenen" }
  ],
  hint: "Dat je dit niet weet is dus het probleem, oefenen dus!",
  nextURL: "/questions/6"
},
{
  title: "Computer spelletjes",
  subtitle: "... niet alleen op de computer, maar ook PS3, Wii enz.",
  imageURL: "/7-minecraft.png",
  question: "Hebben we hier te maken met een probleem?",
  answerKeywords: [
    { tag: "verslaving" },
    { tag: "verslaafd" }
  ],
  hint: "Iets waar je niet zonder kunt is een ...?",
  nextURL: "/questions/7"
},
{
  title: "YouTube filmpjes",
  subtitle: "niet alleen kijken",
  imageURL: "/8-youtube.png",
  question: "Niet alleen filmpjes kijken, maar gelukkig ook ...",
  answerKeywords: [
    { tag: "maken" },
    { tag: "gemaakt" },
    { tag: "upload"}
  ],
  hint: "kaaskipcraft van der heijden - als eerste in de familie - heeft het 4 keer gedaan",
  nextURL: "/finish"
}
];

app.get("/", function(request, response) { 
  response.redirect("/questions/0");
});

app.get("/questions/:id", function(request, response) {
  var id = request.params.id;
  
  response.render("question", questions[id]);
});

app.get("/finish", function(request, response) {
  response.render("finish", {
    title: "Alle vragen goed!",
    subtitle: "de prijs kan worden opgehaald bij de organisatie",
    imageURL: "/cadeau.jpg"
  });
});

var port = process.env.PORT || 8081;
app.listen(port, "0.0.0.0", function() {
	console.log("Listening on " + port);
});
