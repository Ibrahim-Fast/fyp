const jwt = require('jsonwebtoken')
const tailor = require('../../../models/tailor')
const customer = require('../../../models/customer')
const product = require('../../../models/product')
const service = require('../../../models/service')
const tailor_shop = require('../../../models/tailor_shop')

const get_customer_rating = async (req, res) => {
    try {
        if (typeof req.params.type === 'undefined' || typeof req.params.id === 'undefined') {
            throw { error_msg: 'incomplete' }
        }
        var c = ''
        switch (req.params.type) {
            case 'c': {
                c = await customer.findOne({ _id: req.param._id })
                if (c === null || !c) {
                    console.log("customer not exists")
                    throw { error_msg: "does not exists" }
                }
            }
            case 't': {
                c = await tailor.findOne({ _id: req.param._id })
                if (c === null || !c) {
                    console.log("customer not exists")
                    throw { error_msg: "does not exists" }
                }
            }
            case 'p': {
                c = await product.findOne({ _id: req.param._id })
                if (c === null || !c) {
                    console.log("customer not exists")
                    throw { error_msg: "does not exists" }
                }
            }
            case 's': {
                c = await service.findOne({ _id: req.param._id })
                if (c === null || !c) {
                    console.log("customer not exists")
                    throw { error_msg: "does not exists" }
                }
            }
            case 'ts': {
                c = await tailor_shop.findOne({ _id: req.param._id })
                if (c === null || !c) {
                    console.log("customer not exists")
                    throw { error_msg: "does not exists" }
                }
            }

            default:
                throw { error_msg: 'incomplete' }
        }

        res.send({ rating: c.rating })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = get_customer_rating