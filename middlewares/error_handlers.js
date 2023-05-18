const not_found = (req, res, next) => {
    const error = new Error(`not found : ${req.originalUrl}`)
    res.status(404)
    // next(error)
    x=JSON.stringify({error_message:`${error}`})
    next(x)
}

const error_handler = (req, res, next) => {
    const status_code = res.statusCode === 200 ? 500 : res.statusCode
    res.status(res.statusCode)
    res.send({
        message:err.message,
        stack:process.env.NODE_ENV==='production'?null:err.stack
    })
}


module.exports={error_handler,not_found}