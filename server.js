// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require Mongoose
app.use(express.static( __dirname + '/dist' ));
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "1955" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/ninjagold');
var GoldSchema = new mongoose.Schema({
    your_gold: {type: Number, default: 0},
    activities: {type: Array},
    }, {timestamps: true});
mongoose.model('Gold', GoldSchema);
var Gold = mongoose.model('Gold');
// Use native promises
mongoose.Promise = global.Promise;

app.get('/gold', function(req, res){
    Gold.find({}, function(err, activities){
        console.log("index route: ", activities);
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        } else {
            // respond with 
            res.json({message: "Success", data: activities});
        };
    });
});
app.post('/gold/new', function(req, res){
    console.log("In server.js:", req.body);
    var activity = new Gold(req.body);
    console.log("new act", activity);
    // Try to save that new eagle to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    activity.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong with activity save');
            res.json({message: "Error", error: err});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a Activity!');
            res.json({message: "Success", data: activity});
        };
    });
});
//reset game
app.get('/gold/reset', function(req, res){
    Gold.remove({}, function(err){
        if(err) {
            console.log('something went wrong with the remove');
            res.json({message: "Error", error: err});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully cleared DB!');
            res.json({message: "Success"});
        };
    });
});

// Setting our Server to Listen on Port: 8009
app.listen(8009, function() {
    console.log("listening on port 8009");
});