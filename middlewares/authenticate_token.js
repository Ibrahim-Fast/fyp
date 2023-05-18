const jwt = require('jsonwebtoken')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const authenticate_token = async (req, res, next) => {
    const header_token = req.headers['authorization']
    // console.log(header_token)

    const token = header_token && header_token.split(' ')[1]
    if (token == null) {
        
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        } else {
            req.body.token = token
            return next()
        }
    })
}

module.exports = authenticate_token