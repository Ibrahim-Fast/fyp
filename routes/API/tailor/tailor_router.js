const express = require('express')
const authenticate_token = require('../../../middlewares/authenticate_token')
const check_tailor = require('../../../middlewares/check_tailor')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/api/tailor', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_tailor_info"))

router.post('/api/tailor/portfolio', authenticate_token, check_tailor, require("../../../controllers/api/tailor/create/create_portfolio"))

router.put('/api/tailor/portfolio', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/update_portfolio"))

router.get('/api/tailor/portfolio', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_tailor_portfolio.js"))

router.put('/api/tailor', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/edit_tailor_info"))


//done
router.post('/api/tailor/shop', authenticate_token, check_tailor, upload.any(), require("../../../controllers/api/tailor/create/add_tailor_shop"))

//done
router.get('/api/tailor/shop', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_tailor_shops_info"))

//done
router.get('/api/tailor/shop/:page', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_tailor_shops_info_paged"))

router.get('/api/tailor/shop/si/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_shop_info"))

router.put('/api/tailor/shop/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/update_tailor_shop_info"))

router.get('/api/tailor/product', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_products"))

router.get('/api/tailor/product/:page', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_products_paged"))

router.get('/api/tailor/:shop_id/product/pi/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_product"))

router.get('/api/tailor/service', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_services"))

router.get('/api/tailor/service/:page', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_services_paged"))

router.get('/api/tailor/:shop_id/service/si/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_service"))

router.get('/api/tailor/orders/service', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_service_orders"))

router.get('/api/tailor/orders/service/:page', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_service_orders"))

router.get('/api/tailor/orders/service/si/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_service_orders"))

router.get('/api/tailor/orders/product', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_product_orders"))

router.get('/api/tailor/orders/product/:page', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_all_product_orders"))

router.get('/api/tailor/orders/product/pi/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/read/send_product_orders"))

// router.put('/api/tailor/orders/service/amend/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/amend_service_order"))

// router.put('/api/tailor/orders/product/amend/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/amend_product_order"))

router.patch('/api/tailor/orders/product/', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/amend_product_order"))

router.post('/api/tailor/complain', authenticate_token, check_tailor, require("../../../controllers/api/tailor/create/compalin_tailor"))

router.patch('/api/tailor/orders/product/finalize/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/finalize_product_order"))

router.patch('/api/tailor/orders/service/finalize/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/finalize_service_order"))

//done
router.post('/api/tailor/product', authenticate_token, check_tailor, upload.any(), require("../../../controllers/api/tailor/create/add_product"))

//done
router.put('/api/tailor/product/:shop_id/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/edit_product"))

//done
router.post('/api/tailor/service', authenticate_token, check_tailor, upload.any(), require("../../../controllers/api/tailor/create/add_service"))

//done
router.put('/api/tailor/service/:shop_id/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/update/edit_service"))



router.delete('/api/tailor/product/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/delete/remove_product"))

router.delete('/api/tailor/service/:id', authenticate_token, check_tailor, require("../../../controllers/api/tailor/delete/remove_service"))

module.exports = router