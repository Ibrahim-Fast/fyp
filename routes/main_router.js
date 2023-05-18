const express=require('express')

const router=express.Router()

//______________________________________________________________________________________________//

router.use(require('./index'))

//______________________________________________________________________________________________//
router.use(require('./API/api_router')) //api communication 

router.use(require('./Authentication/authentication_router')) //login and register

module.exports=router