const express=require('express')
const authenticate_token=require('../../../middlewares/authenticate_token')
const check_admin=require('../../../middlewares/check_admin')

const router=express.Router()


router.post('/api/admin/product-category',authenticate_token,check_admin,require('../../../controllers/api/admin/add_product_category'))

router.post('/api/admin/service-category',authenticate_token,check_admin,require('../../../controllers/api/admin/add_service_category'))

router.put('/api/admin/product-category',authenticate_token,check_admin,require('../../../controllers/api/admin/update_product_category'))

router.put('/api/admin/service-category',authenticate_token,check_admin,require('../../../controllers/api/admin/update_service_category'))

router.delete('/api/admin/product-category',authenticate_token,check_admin,require('../../../controllers/api/admin/remove_product_category'))

router.delete('/api/admin/service-category',authenticate_token,check_admin,require('../../../controllers/api/admin/remove_service_category'))

router.get('/api/admin/complain/customer',authenticate_token,check_admin,require('../../../controllers/api/admin/get_all_complains_customer'))

router.get('/api/admin/complain/tailor',authenticate_token,check_admin,require('../../../controllers/api/admin/get_all_complains_tailor'))

router.patch('/api/admin/complain',authenticate_token,check_admin,require('../../../controllers/api/admin/finalize_complains'))

router.get('/api/admin/accounts/customers',authenticate_token,check_admin,require('../../../controllers/api/admin/get_all_customer_accounts'))

router.get('/api/admin/accounts/tailors',authenticate_token,check_admin,require('../../../controllers/api/admin/get_all_tailor_accounts'))

router.patch('/api/admin/accounts/customers',authenticate_token,check_admin,require('../../../controllers/api/admin/change_account_status_customer'))

router.patch('/api/admin/accounts/tailors',authenticate_token,check_admin,require('../../../controllers/api/admin/change_account_status_tailor'))

router.patch('/api/admin/order/service',authenticate_token,check_admin,require('../../../controllers/api/admin/change_status_product'))

router.patch('/api/admin/order/product',authenticate_token,check_admin,require('../../../controllers/api/admin/change_status_service'))



module.exports=router