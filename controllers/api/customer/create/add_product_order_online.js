const customer = require('../../../../models/customer')
const product = require('../../../../models/product')
const tailor_shop = require('../../../../models/tailor_shop')
const tailor = require('../../../../models/tailor')
const product_order = require('../../../../models/product_order')
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const jwt = require('jsonwebtoken')

const add_product_order = async (req, res) => {
    try {

        if (typeof req.body.intent === 'undefined' ||
            typeof req.body.o1 === 'undefined' ||
            typeof req.body.o2 === 'undefined' ||
            typeof req.body.o3 === 'undefined'
        ) {
            throw { error_msg: 'incomplete data' }
        }
        const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
        var c = await customer.findOne({ email: decoded.email })
        if (!c || c === null) {
            return res.status(404).send({ error_msg: 'cannot add customer not exists' })
        }
        if (!c.address || c.address === '') {
            return res.status(404).send({ error_msg: 'cannot add order, address is not set' })
        }


        // console.log(req.body)
        // console.dir(req.body.o1)
        // console.dir(req.body.o2)
        // console.dir(req.body.o3)

        for (key in req.body.o1) {
            const value = req.body.o1[key];
            for (k2 in value) {
                const v2 = value[k2];
                for (i in v2) {
                    // console.log('values inside values inside values', i)
                    let p = await product.findOne({ _id: v2[i].product_id, shop_id: v2[i].shop_id })
                    if (!p || p === null) {
                        return res.status(404).send({ msg: 'cannot add product not exists' })
                    }
                    let o = await product_order.create({
                        shop_id: v2[i].shop_id,
                        customer_id: c._id,
                        delivery_address: c.address,
                        product_id: v2[i].product_id,
                        quantity: v2[i].quantity,
                        product_name: v2[i].name,
                        order_payment_type: v2[i].order_payment_type,
                        negotiation_status: v2[i].order_negotiate,
                        negotiation_amount_offered: v2[i].negotiation_offer,
                        urgent: v2[i].urgent,
                        amount: (p.product_price - (p.product_price * (p.discount / 100))),
                        balance: (p.product_price - (p.product_price * (p.discount / 100))),
                        given: 0
                    })
                    if (!o || o === null) {
                        return res.status(404).send({ msg: 'cannot add order error' })
                    }
                }
            }
        }
        for (key in req.body.o2) {
            const value = req.body.o2[key];
            for (k2 in value) {
                const v2 = value[k2];
                for (i in v2) {
                    // console.log('values inside values inside values', i)
                    let p = await product.findOne({ _id: v2[i].product_id, shop_id: v2[i].shop_id })
                    if (!p || p === null) {
                        return res.status(404).send({ msg: 'cannot add product not exists' })
                    }
                    let amount = (p.product_price - (p.product_price * (p.discount / 100)))
                    let o = await product_order.create({
                        shop_id: v2[i].shop_id,
                        customer_id: c._id,
                        delivery_address: c.address,
                        product_id: v2[i].product_id,
                        quantity: v2[i].quantity,
                        order_payment_type: v2[i].order_payment_type,
                        negotiation_status: v2[i].order_negotiate,
                        negotiation_amount_offered: v2[i].negotiation_offer,
                        urgent: v2[i].urgent,
                        amount: amount,
                        product_name: v2[i].name,
                        balance: amount - (amount * 0.3),
                        given: amount * 0.3,
                        payment_token: req.body.intent

                    })
                    if (!o || o === null) {
                        return res.status(404).send({ msg: 'cannot add order error' })
                    }
                }
            }
        }
        for (key in req.body.o3) {
            const value = req.body.o3[key];
            for (k2 in value) {
                const v2 = value[k2];
                for (i in v2) {
                    // console.log('values inside values inside values', i)
                    let p = await product.findOne({ _id: v2[i].product_id, shop_id: v2[i].shop_id })
                    if (!p || p === null) {
                        return res.status(404).send({ msg: 'cannot add product not exists' })
                    }
                    let amount = (p.product_price - (p.product_price * (p.discount / 100)))
                    let o = await product_order.create({
                        shop_id: v2[i].shop_id,
                        customer_id: c._id,
                        delivery_address: c.address,
                        product_id: v2[i].product_id,
                        quantity: v2[i].quantity,
                        order_payment_type: v2[i].order_payment_type,
                        negotiation_status: v2[i].order_negotiate,
                        negotiation_amount_offered: v2[i].negotiation_offer,
                        urgent: v2[i].urgent,
                        product_name: v2[i].name,
                        amount: amount,
                        balance: 0,
                        given: amount,
                        payment_token: req.body.intent
                    })
                    if (!o || o === null) {
                        return res.status(404).send({ msg: 'cannot add order error' })
                    }
                }
            }
        }

        // for (let i = 0; i < req.body.offline_order.length; i++) {

        // }
        // for (let i = 0; i < req.body.online_order.length; i++) {

        // }

        return res.send({ message: "product order recieved " })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: JSON.stringify(e) })
    }

}

module.exports = add_product_order