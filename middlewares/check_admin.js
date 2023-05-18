const jwt=require('jsonwebtoken')

const check_admin=(req,res,next)=>{

    const decoded_token = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (decoded_token.type === 'a') {
        return next()
    }
    else{
        res.status(401).send({ message: "you are not allowed" })
    }
}

module.exports=check_admin