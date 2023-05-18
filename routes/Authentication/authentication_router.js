const express=require('express')
const email_regex = require('../../middlewares/email_regex')
const authenticate_token = require('../../middlewares/authenticate_token')

const router=express.Router()

//done
router.post('/login/customer', email_regex, require('../../controllers/authentication/customer_login'))
//done
router.post('/login/tailor', email_regex,require('../../controllers/authentication/tailor_login') )
//done
router.post('/login/admin', email_regex, require('../../controllers/authentication/admin_login'))

//done
router.post('/register/customer', email_regex, require('../../controllers/authentication/customer_register'))
//done
router.post('/register/tailor', email_regex, require('../../controllers/authentication/tailor_register'))
//done
router.post('/register/admin', authenticate_token,email_regex, require('../../controllers/authentication/admin_register'))


module.exports=router