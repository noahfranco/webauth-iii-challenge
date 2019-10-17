// Cookie Middleware
module.exports = (req, res, next) => {
    if(req.sessions && req.sessions.username) {
        next()
    } else {
        res.status(401).json({ error: "user not authorized" })
    };
};