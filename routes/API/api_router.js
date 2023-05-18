const express=require('express')

const router=express.Router()

// router.use(require('./admin/admin_router'))
router.use(require('./customer/customer_router'))
router.use(require('./tailor/tailor_router'))
router.use(require('./general/general_router'))

module.exports=router