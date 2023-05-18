const customer = require('../../../../models/customer')
const product = require('../../../../models/product')
const tailor_shop = require('../../../../models/tailor_shop')
const tailor = require('../../../../models/tailor')
const product_order = require('../../../../models/product_order')
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const jwt = require('jsonwebtoken')

const add_product_order = async (req, res) => {
    try {

        if (typeof req.body.order === 'undefined') {
            throw { error_msg: 'Incomplete data' }
        }
        const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);

        var c = await customer.findOne({ email: decoded.email })
        if (!c || c === null) {
            return res.status(404).send({ error_msg: 'cannot add customer not exists' })
        }
        if (!c.address || c.address === '') {
            return res.status(404).send({ error_msg: 'cannot add order, address is not set' })
        }


        const orders_1 = []
        const orders_2 = []
        const orders_3 = []

        for (const key in req.body.order) {
            // console.log(key);
            const value = req.body.order[key];
            for (const key2 in value) {
                // console.log(key2);
                const inner_value = value[key2];
                for (const key3 in inner_value) {
                    // console.log(key2);
                    const innermost_value = inner_value[key3];
                    // console.log('shop id', key, 'payment type', key2, 'product id', inner_value[0].product_id);
                    // console.log('shop id', key, 'payment type', key2, 'product id', innermost_value);
                    // console.log('---');
                    // console.log(innermost_value.order_payment_type);
                    if (innermost_value.order_payment_type === 1) {
                        orders_1.push(innermost_value)
                    }
                    if (innermost_value.order_payment_type === 2) {
                        orders_2.push(innermost_value)
                    }
                    if (innermost_value.order_payment_type === 3) {
                        orders_3.push(innermost_value)
                    }
                }
            }
        }


        // ----------------------------------------------------------------------------------------------------------------------------------
        let online_amount = 0
        // console.log('orders_1', orders_1)
        for (let i = 0; i < orders_2.length; i++) {
            let p = await product.findOne({ _id: orders_2[i].product_id, shop_id: orders_2[i].shop_id })
            if (!p || p === null) {
                return res.status(404).send({ msg: 'cannot add product not exists' })
            }
            online_amount = online_amount + (((p.product_price - (p.product_price * (p.discount / 100))) * 0.3) * orders_2[i].quantity)
        }
        for (let i = 0; i < orders_3.length; i++) {
            let p = await product.findOne({ _id: orders_3[i].product_id, shop_id: orders_3[i].shop_id })
            if (!p || p === null) {
                return res.status(404).send({ msg: 'cannot add product not exists' })
            }
            online_amount = online_amount + ((p.product_price - (p.product_price * (p.discount / 100)) * orders_3[i].quantity))
        }


        // console.log('amount', online_amount)


        if (online_amount > 0) {

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: online_amount * 100,
                    currency: 'pkr',
                })
                return res.status(200).json({ next: 1, clientSecret: paymentIntent.client_secret });
            }
            catch (e) {
                console.log(e)
                return res.status(500).json({ error_msg: 'An error occurred while creating payment intent.' });
            }
        }
        // ----------------------------------------------------------------------------------------------------------------------------------
        // console.log('orders_1', orders_1)
        for (let i = 0; i < orders_1.length; i++) {

            let p = await product.findOne({ _id: orders_1[i].product_id, shop_id: orders_1[i].shop_id })

            if (!p || p === null) {
                return res.status(404).send({ msg: 'cannot add product not exists' })
            }

            let o = await product_order.create({
                shop_id: orders_1[i].shop_id,
                customer_id: c._id,
                delivery_address: c.address,
                product_id: orders_1[i].product_id,
                quantity: orders_1[i].quantity,
                product_name: orders_1[i].name,
                order_payment_type: orders_1[i].order_payment_type,
                negotiation_status: orders_1[i].order_negotiate,
                negotiation_amount_offered: orders_1[i].negotiation_offer,
                urgent: orders_1[i].urgent,
                amount: (p.product_price - (p.product_price * (p.discount / 100))),
                balance: (p.product_price - (p.product_price * (p.discount / 100))),
                given: 0,
            })

            if (!o || o === null) {
                return res.status(400).send({ msg: 'ERROR ADDING ORDERS PLEASE REDO' })
            }

        }


        return res.send({ message: "product orders recieved " })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: JSON.stringify(e) })
    }

}

module.exports = add_product_order