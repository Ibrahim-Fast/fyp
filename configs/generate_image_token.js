if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const jwt = require('jsonwebtoken')


const generate_token = () => {
    try {
        token = jwt.sign({}, process.env.IMAGE_API_SECRET, {
            expiresIn: '7m'
        })
        return token
    }
    catch (e) {
        console.log(e)
    }
}

// console.log(generate_token())
module.exports=generate_token