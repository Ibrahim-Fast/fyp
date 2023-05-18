if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const jwt = require('jsonwebtoken')


const generate_token = (email, type) => {
    try {
        if (!email) {
            throw 'no email'
            return
        }
        token = jwt.sign({ email, type }, process.env.JWT_SECRET, {
            expiresIn: '10h'
        })
        return token
    }
    catch (e) {
        console.log(e)
    }
}
//3.75mins expiry
module.exports = generate_token