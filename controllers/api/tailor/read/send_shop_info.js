const jwt = require('jsonwebtoken')
const tailor = require('../../../../models/tailor')
const tailor_shop = require('../../../../models/tailor_shop')
const mongoose = require('mongoose');

const send_shop_info = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID SHOP ID" }
        }
        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email })
        if (t === null || !t) {
            throw { error_msg: "TAILOR DOES NOT EXISTS" }
        }

        shop = await tailor_shop.findOne({ _id: req.params.id, tailor_id: t._id },['-__v','-updatedAt','-_id','-tailor_id'])
        if (shop === null || !shop) {
            throw { error_msg: "THIS SHOP DOES NOT EXISTS RELATIVE TO THIS TAILOR" }
        }
        res.send(shop)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = send_shop_info