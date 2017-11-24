
// Server and data modeler
var express = require("express"),
    http = require("http"),
    // import the mongoose library
    mongoose = require("mongoose"),
    app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

// Connects to data store
mongoose.connect('mongodb://localhost/amazeriffic');

// Data model
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.createServer(app).listen(3000);

// Get request and route
app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
	res.json(toDos);
    });
});

// Post request and route
app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});

    newToDo.save(function (err, result) {
	if (err !== null) {
	    console.log(err);
	    res.send("ERROR");
	} else {
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    res.send("ERROR");
		}
		res.json(result);
	    });
	}
    });
});

