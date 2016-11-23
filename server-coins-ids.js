/**
 * Created by Andrey on 22.11.2016.
 */

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var mongoOpIds  =   require("./models/coinsid");
var router      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/coinsid")
    .get(function(req,res){
        var response = {};
        mongoOpIds.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var db = new mongoOpIds();
        var response = {};

        db.originalid = req.body.originalid;

        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");



