const db = require("../data/db-config.js"); 

module.exports = {
    add, // .post() ~ register
    addId, // .get() ~ login
    find, // .get() ~ users
    findById
}

function find() { // users
    return db("users")
    .select("id", "username", "password") // "departments"
}

function findById(id) {
    return db("users")
    .where({ id })
    .first()
}

function add(user) { // register
    return db("users")
    .insert(user, "id")
    .then(ids => {
        return findById([ids]) 
    })
}
function addId(filter) { // login and users
    return db("users")
    .where(filter)
}