const jwt=require('jsonwebtoken')

const check_tailor=(req,res,next)=>{
    // console.log('here')
    const decoded_token = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded_token.type === 't') {
        return next()
    }
    else{
        res.status(401).send({ message: "you are not allowed" })
    }
}

module.exports=check_tailor