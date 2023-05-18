const jwt = require('jsonwebtoken')
const tailor = require('../../../../models/tailor')
const tailor_shop = require('../../../../models/tailor_shop')
const product = require('../../../../models/product')
const mongoose = require('mongoose');

const send_product = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID PRODUCT ID" }
        }
        if (!mongoose.isValidObjectId(req.params.shop_id)) {
            throw { error_msg: "INVALID SHOP ID" }
        }
        const decoded = jwt.decode(req.body.token)
        t = await tailor.exists({ email: decoded.email })
        if (t === null || !t) {
            throw { error_msg: "TAILOR DOES NOT EXISTS" }
        }

        s = await tailor_shop.exists({ _id: req.params.shop_id, tailor_id: t })
        if (s === null || !s) {
            throw { error_msg: "SHOP DOES NOT EXISTS" }
        }

        p = await product.findOne({ _id: req.params.id, shop_id: req.params.shop_id, tailor_id: t },
            ['-__v', '-updatedAt', '-tailor_id'])
        if (p === null || !p) {
            throw { error_msg: "PRODUCT DOES NOT EXISTS" }
        }


        res.send(p)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = send_product