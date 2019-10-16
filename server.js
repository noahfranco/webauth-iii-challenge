const express = require("express"); 

// for cookies 
const sessions = require("express-session");
// for cookies 

const register = require("./apis/Router-Register.js");
const login =  require("./apis/Router-Login.js"); 
const users = require("./apis/Router-Users.js");

const server = express()

// Cookies middleware below 
const sessionsConfig = {
    name: "cookies", 
    secret: "It's important to keep this a secret",
    cookie: {
        httpOnly: true, 
        maxAge: 1000 * 60 * 60,
        secure: false
    },
    reSave: false,
    saveUninitialized: true
}

server.use(sessions(sessionsConfig))

server.use(express())

server.use("/api/register", register)
server.use("/api/login", login)
server.use("/api/users", users)

server.get("/", (req, res) => {
    res.send("It's Alive!!!")
})

module.exports = server; 
