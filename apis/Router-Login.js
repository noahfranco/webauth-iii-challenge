const express = require("express"); 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

const Users = require("./Users-Model.js"); 
const secrets = require("../secrets.js"); 

const router = express.Router()

router.post("/", (req, res) => { // localhost:9000/api/login
    const { username } = req.body
    const { password } = req.body

    if(!username && !password) {
        res.status(401).json({ error: "Wrong password or username" })
    } else {
        Users.addId({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                // req.session.username = user.username // part of cookie
                res.status(200).json({ message: `Welcome ${user.username}!!`, token })  
            } else {
                res.status(400).json({ error: "please provide credentials"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Internal Server Error"})
        })
    }
})

// Generate Token Function 
function generateToken(user) {
    const payload = {
        username: user.username,
        subject: user.id,
        role: user.role
    }
    const options = {
        expiresIn: "3h"   
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router; 