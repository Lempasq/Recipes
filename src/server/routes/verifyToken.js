const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // GET TOKEN
    const token = req.header('auth-token')
    if(!token) return res.status(401).json('Access Denied!')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (e) {
        res.status(400).json('Invalid Token')
    }
}