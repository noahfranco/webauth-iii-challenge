const express = require("express"); 
const bcrypt = require("bcrypt"); 

const Users = require("./Users-Model.js"); 

const router = express.Router()

router.post("/", (req, res) => { // localhost:8000/api/register
    const user = req.body
    // const { password } = req.body

    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash 

    if(!hash) {
        res.status(404).json({error: "Please enter the correct credentials"})
    } else {
        Users.add(user)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Internal Server Error"})
        })
    }
})

router.get("/hash", (req, res) => {
    const password = req.headers.authorization

    if(password) {
        const hash = bcrypt.hashSync(password, 10)
        res.status(200).json({ hash })
    } else {
        res.status(400).json({ error: "Please provide credentials" })
    }
})

module.exports = router; 