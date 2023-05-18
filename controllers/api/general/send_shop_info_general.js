const mongoose = require('mongoose')
const tailor_shop = require('../../../models/tailor_shop')

const send_tailor_shop_info_general = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID tailor_shop ID" }
        }

        p = await tailor_shop.findOne({ _id: req.params.id },
            ['-__v', '-updatedAt', '-tailor_id','-visibility','-status'])
        if (p === null || !p) {
            throw { error_msg: "tailor_shop DOES NOT EXISTS" }
        }


        res.send(p)

    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = send_tailor_shop_info_general