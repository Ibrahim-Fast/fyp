const express = require('express')
const authenticate_token = require('../../../middlewares/authenticate_token')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router()


router.get('/api/g/product', require("../../../controllers/api/general/send_all_products_general.js"))
router.get('/api/g/product/:page', require("../../../controllers/api/general/send_all_products_general_paged"))

router.get('/api/g/service', require("../../../controllers/api/general/send_all_services_general"))
router.get('/api/g/service/:page', require("../../../controllers/api/general/send_all_services_general_paged"))

router.get('/api/g/shop', require("../../../controllers/api/general/send_all_shops_general.js"))
router.get('/api/g/shop/:page', require("../../../controllers/api/general/send_all_shops_general_paged.js"))
router.get('/api/g/shop/si/:id', require("../../../controllers/api/general/send_shop_info_general.js"))

router.get('/g/image/:id', require("../../../controllers/api/general/get_image"))
router.get('/g/image/:id/data', require("../../../controllers/api/general/get_image_data_only.js"))
router.get('/g/image/:id/mimetype', require("../../../controllers/api/general/get_image_mimetype_only"))

router.get('/api/g/img_token', authenticate_token, require("../../../controllers/api/general/send_image_token"))
router.post('/api/g/image', authenticate_token,upload.single('image'), require("../../../controllers/api/general/upload_image"))

router.get('/api/g/product/pi/:id',  require("../../../controllers/api/general/send_product_info_general"))
router.get('/api/g/service/si/:id',  require("../../../controllers/api/general/send_service_info_general"))

router.get('/api/g/rating/:type/:id',  require("../../../controllers/api/general/get_rating"))

// router.get('/api/g/tailors', require("../../../controllers/api/general/send_all_tailors_general"))
// router.get('/api/g/services', require("../../../controllers/api/general/send_all_services_general"))

// router.get('/api/g/tailors/:id', require("../../../controllers/api/general/send_tailor_info_general"))
// router.get('/api/g/services/:id', require("../../../controllers/api/general/send_service_info_general"))
// router.get('/api/g/products/:id', require("../../../controllers/api/general/send_product_info_general"))

// router.get('/api/g/tailor/:id/reviews', require("../../../controllers/api/general/send_tailor_review_general"))
// router.get('/api/g/products/:id/reviews', require("../../../controllers/api/general/send_product_review_general"))
// router.get('/api/g/services/:id/reviews', require("../../../controllers/api/general/send_service_review_general"))


module.exports = router