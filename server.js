/**
 * Created by Andrey on 22.11.2016.
 */
var mongoose    =   require("mongoose");
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
//var mongoOpIds  =   require("./models/coinsid");
//var mongoOp     =   require("./models/mongo");
var router      =   express.Router();

var conn = mongoose.createConnection('mongodb://localhost:27017/coinsid');
var conn2 = mongoose.createConnection('mongodb://localhost:27017/coins');

var mongoSchema =  mongoose.Schema;

var coinidSchema  = {
    "originalid": String
};

var coinSchema  = {
    "originalid": String,
    "coinid": String,
    "type" : String,
    "region": String,
    "city": String,
    "issuer": String,
    "date_ruled": String,
    "metal": String,
    "denomination": String,
    "struck_cast": String,
    "date_struck": String,
    "diameter": String,
    "weight": String,
    "obverse_legend": String,
    "obverse_description": String,
    "reverse_description": String,
    "mint": String,
    "primary_reference": String,
    "reference2": String,
    "grade": String,
    "die_axis": String,
    "notes": String,
    "photo": String
};

var mongoOpIds = conn.model('parsedcoinsids', coinidSchema);
var mongoOp = conn2.model('parsedcoins', coinSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

//////////////////////////////////////////
router.route("/coinsid")
    .get(function(req,res){
        var response2 = {};
        mongoOpIds.find({},function(err,data){
            if(err) {
                response2 = {"error" : true,"message" : "Error fetching data"};
            } else {
                response2 = {"error" : false,"message" : data};
            }
            res.json(response2);
        });
    })
    .post(function(req,res){
        var db2 = new mongoOpIds();
        var response2 = {};

        db2.originalid = req.body.originalid;

        db2.save(function(err){
            if(err) {
                response2 = {"error" : true,"message" : "Error adding data"};
            } else {
                response2 = {"error" : false,"message" : "Data added"};
            }
            res.json(response2);
        });
    });

////////////////////////////////////////////////////
router.route("/coins")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};

        db.originalid = req.body.originalid;
        db.coinid = req.body.coinid;
        db.type = req.body.type;
        db.region = req.body.region;
        db.city = req.body.city;
        db.issuer = req.body.issuer;
        db.date_ruled = req.body.date_ruled;
        db.metal = req.body.metal;
        db.denomination = req.body.denomination;
        db.struck_cast = req.body.struck_cast;
        db.date_struck = req.body.date_struck;
        db.diameter = req.body.diameter;
        db.weight = req.body.weight;
        db.obverse_legend = req.body.obverse_legend;
        db.obverse_description = req.body.obverse_description;
        db.reverse_description = req.body.reverse_description;
        db.mint = req.body.mint;
        db.primary_reference = req.body.primary_reference;
        db.reference2 = req.body.reference2;
        db.grade = req.body.grade;
        db.die_axis = req.body.die_axis;
        db.notes = req.body.notes;
        db.photo = req.body.photo;

        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/coins/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};

        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.originalid !== undefined) {data.originalid = req.body.originalid;}
                if(req.body.coinid !== undefined) {data.coinid = req.body.coinid;}
                if(req.body.type !== undefined) {data.type = req.body.type;}
                if(req.body.region !== undefined) {data.region = req.body.region;}
                if(req.body.city !== undefined) {data.city = req.body.city;}
                if(req.body.issuer !== undefined) {data.issuer = req.body.issuer;}
                if(req.body.date_ruled !== undefined) {data.date_ruled = req.body.date_ruled;}
                if(req.body.metal !== undefined) {data.metal = req.body.metal;}
                if(req.body.denomination !== undefined) {data.denomination = req.body.denomination;}
                if(req.body.struck_cast !== undefined) {data.struck_cast = req.body.struck_cast;}
                if(req.body.date_struck !== undefined) {data.date_struck= req.body.date_struck;}
                if(req.body.diameter !== undefined) {data.diameter= req.body.diameter;}
                if(req.body.weight !== undefined) {data.weight = req.body.weight;}
                if(req.body.obverse_legend !== undefined) {data.obverse_legend = req.body.obverse_legend;}
                if(req.body.obverse_description !== undefined) {data.obverse_description = req.body.obverse_description;}
                if(req.body.reverse_description !== undefined) {data.reverse_description = req.body.reverse_description;}
                if(req.body.mint !== undefined) {data.mint = req.body.mint;}
                if(req.body.primary_reference !== undefined) {data.primary_reference = req.body.primary_reference;}
                if(req.body.reference2 !== undefined) {data.reference2 = req.body.reference2;}
                if(req.body.grade !== undefined) {data.grade = req.body.grade;}
                if(req.body.die_axis !== undefined) {data.die_axis = req.body.die_axis;}
                if(req.body.notes !== undefined) {data.notes = req.body.notes;}
                if(req.body.photo !== undefined) {data.notes = req.body.photo;}

                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })
///////////////////////////////////////

app.use('/',router);

app.listen(3000);

console.log("Listening to PORT 3000");



