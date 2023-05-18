const express = require('express')
const authenticate_token = require('../../../middlewares/authenticate_token')
const check_customer = require('../../../middlewares/check_customer')


const router = express.Router()

router.get('/api/customer', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_customer_account_info"))
router.put('/api/customer/address', authenticate_token, check_customer, require("../../../controllers/api/customer/update/update_address"))

//done
router.get('/api/customer/orders/service', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_all_service_orders"))

router.get('/api/customer/orders/service/:page', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_all_service_order_paged.js"))

router.get('/api/customer/orders/product', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_all_product_orders"))

//done
router.get('/api/customer/orders/product/:page', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_all_product_order_paged"))

//done
router.get('/api/customer/orders/service/s/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_service_order"))

//done
router.get('/api/customer/orders/product/p/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/read/send_product_orders"))

//done
router.post('/api/customer/orders/service', authenticate_token, check_customer, require("../../../controllers/api/customer/create/add_service_order"))

//done
router.post('/api/customer/orders/product', authenticate_token, check_customer, require("../../../controllers/api/customer/create/add_product_order"))

router.post('/api/customer/orders/product/online', authenticate_token, check_customer, require("../../../controllers/api/customer/create/add_product_order_online.js"))

router.put('/api/customer/orders/service/s/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/edit_service_order"))

router.put('/api/customer/orders/product/p/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/edit_product_order"))

router.post('/api/customer/complain', authenticate_token, check_customer, require("../../../controllers/api/customer/create/complain_customer"))

router.patch('/api/customer/orders/service/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/finalize_service_order"))

router.patch('/api/customer/orders/product/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/finalize_product_order"))

router.patch('/api/customer/orders/product', authenticate_token, check_customer, require("../../../controllers/api/customer/update/amend_product_order"))

router.put('/api/customer/orders/service/amend/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/amend_service_order"))

router.put('/api/customer/orders/product/amend/:id', authenticate_token, check_customer, require("../../../controllers/api/customer/update/amend_product_order"))


module.exports = router