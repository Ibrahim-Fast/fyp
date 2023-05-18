if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const jwt = require('jsonwebtoken')

//rc=reuse_count
const generate_refresh_token = (email,type,rc) => {
    try{
        if(!email){
            throw 'no email'
            return
        }
        token=jwt.sign({ email,type,rc }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '2h'
        })
        return token 
    }
    catch(e){
        console.log(e)
    }
}

module.exports=generate_refresh_token