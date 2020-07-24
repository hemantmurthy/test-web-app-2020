const fs = require('fs');
const express = require('express');
const appjwt = require("./auth/jwt.js");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Jungle"
    });
});

app.post("/login", (req, res) => {
    // Authenticate user ...
    let user = {
        id: "123980983982",
        username: "krishna",
        email: "krishna@dwarkanet.com"
    }

    appjwt.generate(user, res);
});

app.get("/protected", (req, res, next) => {
    appjwt.verify(req, res, next);    
}, (req, res) => {
    res.json({
        message: "Authorized",
        authData: req.auth_data
    });
});

const appPort = process.env.PORT || 3000;
console.log("Starting app on port " + appPort);
app.listen(appPort, () => {
    console.log("Application started successfully");
});