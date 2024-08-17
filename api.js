
require('dotenv').config();

var express = require("express")
var cors = require("cors");
var mongoclient = require('mongodb').MongoClient;

// var conString = "mongodb://127.0.0.1:27017";

// var conString = 'mongodb+srv://jogadand4:mNeoWfFCLUrB1G48@solar.txki1wv.mongodb.net/?retryWrites=true&w=majority&appName=Solar'

var PORT = process.env.PORT || 7070

var app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());




// app.get("/Users" , ( req , res) =>{
//     mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
//         var database = clientobj.db("Hospital");
//        database.collection("Users").find({}).toArray().then((docs)=>{
//         res.send(docs)
//         res.end();
//        })
//     })

// })

// app.get("/Users/:name", (req, res) => {
//     mongoclient.connect(process.env.MONGODB_String).then((clientobj) => {
//         var database = clientobj.db("Hospital");
//          database.collection("Users").find({ Username: req.params.name }).toArray().then((docs)=>{
//             res.send(docs)
//             res.send();
//          })
//     })
// });


app.get("/Users", (req, res) => {
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) => {
        var database = clientobj.db("Hospital");
        database.collection("Users").find({}).toArray().then((docs) => {
            res.send(docs);
        }).catch(err => {
            res.status(500).send("Error fetching users");
        }).finally(() => {
            clientobj.close();
        });
    }).catch(err => {
        res.status(500).send("Database connection error");
    });
});

app.get("/Users/:name", (req, res) => {
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) => {
        var database = clientobj.db("Hospital");
        database.collection("Users").find({ Username: req.params.name }).toArray().then((docs) => {
            res.send(docs);
        }).catch(err => {
            res.status(500).send("Error fetching user");
        }).finally(() => {
            clientobj.close();
        });
    }).catch(err => {
        res.status(500).send("Database connection error");
    });
});







app.post("/userRegister" , (req , res)=>{
    var users = {
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password
    }
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Users").insertOne(users).then((docs) =>{
            console.log("User Register");
            res.end();
        })
    })
})


app.get("/admin" , (req , res) =>{
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Admin").find({}).toArray().then((docs)=>{
            res.send(docs)
            res.end();
        });
    });
});

app.get("/specialist" , ( req , res) =>{
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Specialist").find({}).toArray().then((docs) =>{
            res.send(docs);
            res.end();
        })
    })
})

app.post("/adddoctor" , (req , res) =>{
    var doctor = {
        Username:req.body.Username,
        Qua:req.body.Qua,
        Spe:req.body.Spe,
        Mobaile:req.body.Mobaile,
        Email:req.body.Email,
        Password:req.body.Password ,
        Date:req.body.Date
    }
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Doctors").insertOne(doctor).then((docs) =>{
           console.log("Doctor Added")
            res.end();
        })
    })
});

app.get("/getdoctor" , (req , res) =>{
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Doctors").find({}).toArray().then((docs) =>{
            res.send(docs);
            res.end();
        })
    })
})

app.get("/getdoctors/:email", (req , res) =>{

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Doctors").find({Email:req.params.email}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
} )

app.put("/editdoctor/:email" , (req , res)=>{

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Doctors").updateOne({Email:req.params.email} , {$set: {Username:req.body.Username , Qua:req.body.Qua , Spe:req.body.Spe, Mobaile:req.body.Mobaile , Email:req.body.Email , Password:req.body.Password , Date:req.body.Date}}).then(()=>{
            console.log("Task Updated")
            res.end();
        })
    })

})



app.get("/Users" , ( req , res) =>{
    mongoclient.connect(process.env.MONGODB_String).then((clientobj) =>{
        var database = clientobj.db("Hospital");
        database.collection("Users").find({}).toArray().then(docs =>{
            res.send(docs)
            res.end();
        })
    })
})

app.post("/addAppointment" , (req , res )=>{
    var appointment ={
        Username:req.body.Username,
        Age:req.body.Age,
        Email:req.body.Email,
        Diseases:req.body.Diseases,
        Gender:req.body.Gender,
        Date:req.body.Date,
        Mobaile:req.body.Mobaile,
        Doctor:req.body.Doctor,
        Address:req.body.Address
    }
    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").insertOne(appointment).then((docs)=>{
            console.log("Appointment Added")
            res.end();
        })
    })
})

app.get("/getAppointment" , (req , res) =>{
    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
})

app.get("/getAppointment/:username", (req , res) =>{

        mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
            var database = clientobj.db("Hospital");
            database.collection("Appointment").find({Username:req.params.username}).toArray().then((docs)=>{
                res.send(docs);
                res.end();
            })
        })
} )

app.put("/editAppointment/:diseases" , (req , res)=>{

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").updateOne({Diseases:req.params.diseases} , {$set: {Username:req.body.Username , Age:parseInt(req.body.Age), Email:req.body.Email , Diseases:req.body.Diseases, Gender:req.body.Gender , Date:req.body.Date , Mobaile:req.body.Mobaile , Doctor:req.body.Doctor , Address:req.body.Address}}).then(()=>{
            console.log("Task Updated")
            res.end();
        })
    })

})

app.get("/getAppointmentss/:diseases", (req , res) =>{

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").find({Diseases:req.params.diseases}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
} )

app.get("/getAppointments/:doctor", (req , res) =>{

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").find({Doctor:req.params.doctor}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
} )


app.post("/specialist" , (req , res ) =>{
    var specia ={
        Specialist:req.body.Specialist
    }
    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Specialist").insertOne(specia).then((docs)=>{
            console.log("Specialist Added");
            res.end();
        })
    })
})

app.delete("/deleteAppointment/:mobaile" , (req , res) =>{
    var mobaile =parseInt (req.params.mobaile)

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Appointment").deleteOne({Mobaile:mobaile}).then(()=>{
            console.log("Appointment Delete");
            res.end();
        })
    })

})

app.delete("/deleteDoctor/:mobaile" , (req , res) =>{
    var mobaile =parseInt (req.params.mobaile)

    mongoclient.connect(process.env.MONGODB_String).then((clientobj)=>{
        var database = clientobj.db("Hospital");
        database.collection("Doctors").deleteOne({Mobaile:mobaile}).then(()=>{
            console.log("Doctor Delete");
            res.end();
        })
    })

})


app.listen(PORT);
console.log(`Server Started : http://127.0.0.1:7070`);