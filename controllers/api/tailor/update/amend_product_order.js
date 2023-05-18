const product_orders = require('./../../../../models/product_order')
const tailor = require('../../../../models/tailor')
const tailor_shop = require('../../../../models/tailor_shop')
const jwt = require('jsonwebtoken')

const amend_product_order = async (req, res) => {
    try {
        if (typeof req.body._id === 'undefined' || typeof req.body.status === 'undefined') {
            throw { error_msg: "incomplete" }
        }
        po = await product_orders.findOne({ _id: req.body._id })
        if (!po || po === null) {
            throw { error_msg: "cannot find" }
        }

        cpo = await product_orders.updateOne({ _id: req.body._id }, { status: req.body.status })
        if (!cpo || cpo === null) {
            throw { error_msg: "error updating" }
        }
        res.send({ message: "successfully updated" })
    } catch (e) {
        console.log(e)

        if (r) res.status(500).send({ error_msg: r.error_msg })
        else res.status(500).send({ error_msg: e })
    }

}

module.exports = amend_product_order