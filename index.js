// import express, mongoose modules

const express = require("express");
const mongoose = require("mongoose");

const port = 80;
const app = express();

mongoose.connect("mongodb://localhost/projectDG",
{   
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//handling the get request
app.get("/", (req, res) => 
{
    res.set({
        "Access-Control-Allow-Origin": "*",
    });

    return res.redirect("index.html");
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post("/formFillUp", (req, res) => {
    const name = req.body.name;
    const reason = req.body.reason;
    const email = req.body.email;
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const addressline = req.body.addressline;

    const data = {
        name: name,
        reason: reason,
        email: email,
        phone: phone,
        city: city,
        state: state,
        addressline: addressline,
    };

    db.collection("users").insertOne(data,
        (err, collection) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).send("Error inserting data");
            }
            console.log("Data inserted successfully!"); 
        });
        return res.redirect("formSubmitted.html");
});

//Sarting the server on port 80

app.listen(port, () => 
{
    console.log(`The application started successfully on port ${port}`);
});