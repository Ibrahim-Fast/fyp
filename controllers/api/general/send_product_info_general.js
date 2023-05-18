const mongoose = require('mongoose')
const product = require('../../../models/product')

const send_product_info_general = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID PRODUCT ID" }
        }

        p = await product.findOne({ _id: req.params.id },
            ['-__v', '-updatedAt', '-tailor_id','-visibility','-status'])
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

module.exports = send_product_info_general