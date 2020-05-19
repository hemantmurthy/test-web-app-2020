const fs = require('fs');
const jwt = require('jsonwebtoken');

console.log("Reading JWT config ...");
let js = fs.readFileSync("./.hidden/jwt.json");
let jwtConfig = JSON.parse(js);
console.log("JWT config loaded");

function generateToken(user, res) {
    jwt.sign({ user }, jwtConfig.secret, { expiresIn: "60s" }, (err, token) => {
        res.json({
            token
        });
    });

}

function verifyToken(req, res, next) {
    const authHead = req.headers['authorization'];
    if(typeof authHead == 'undefined')
        res.sendStatus(403);
    else {
        const authHeadParts = authHead.split(" ");
        if(authHeadParts[0] == "Bearer") {
            req.token = authHeadParts[1];
            jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
                if(err) 
                    res.sendStatus(403);
                else {
                    req.auth_data = authData;
                    next();
                }
            });
        } else {
            // Don't recognise anything other than Bearer token ...
            res.sendStatus(403);
        }
    }
}

exports.generate = generateToken;
exports.verify = verifyToken;