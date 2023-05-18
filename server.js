if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// const https = require("https");
// const fs = require("fs");
// var privateKey  = fs.readFileSync('./key.pem', 'utf8');
// var certificate = fs.readFileSync('./cert.pem', 'utf8');



const { urlencoded } = require('express')
const express = require('express')
const { error_handler, not_found } = require('./middlewares/error_handlers')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// const stripe = require('stripe')(process.env.STRIPE_SECRET);

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors())
// app.use(cors({ origin: '*' }))
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
// app.use((req, res, next) => {
//     if (req.method === "OPTIONS") {
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({});
//     }
//     next();
// });
const db = require('./configs/database_config')

db()

app.use(require('./routes/main_router'))

app.use(not_found)
app.use(error_handler)


if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build/'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(process.env.PORT, (err) => {
    if (err) {
        throw err
    }
    console.log('SERVER STARTED')
})


// https
//     .createServer(
//         {
//             key: fs.readFileSync("key.pem"),
//             cert: fs.readFileSync("cert.pem"),
//         },
//         app
//     )
//     .listen(process.env.PORT, () => {
//             console.log('SERVER STARTED')

//     });




// var credentials = {key: privateKey, cert: certificate};
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(process.env.PORT, () => {
//                 console.log('SERVER STARTED')
//         });