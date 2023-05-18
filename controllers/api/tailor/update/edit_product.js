const product = require('../../../../models/product')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')
const tailor_shop = require('../../../../models/tailor_shop')


const edit_product = async (req, res) => {
    try {
        if (typeof req.params.id === 'undefined' ||
            typeof req.params.shop_id === 'undefined' ||
            typeof req.body.product_name === 'undefined' ||
            typeof req.body.product_description === 'undefined' ||
            typeof req.body.product_price === 'undefined' ||
            typeof req.body.product_discount === 'undefined' ||
            typeof req.body.visibility === 'undefined' ||
            typeof req.body.product_options === 'undefined' ||
            typeof req.body.bulk_minimum_items === 'undefined' ||
            typeof req.body.bulk_product_price === 'undefined' ||
            typeof req.body.stock_amount === 'undefined' ||
            typeof req.body.stock_status === 'undefined' ||
            req.body.payment_methods.length === 0 ||
            req.body.ordering_methods.length === 0 ||
            typeof req.body.product_categories === 'undefined') {
            console.log(typeof req.params.id === 'undefined' ||
                typeof req.params.shop_id === 'undefined' ||
                typeof req.body.product_name === 'undefined' ||
                typeof req.body.product_description === 'undefined' ||
                typeof req.body.product_price === 'undefined' ||
                typeof req.body.product_discount === 'undefined' ||
                typeof req.body.visibility === 'undefined' ||
                typeof req.body.product_options === 'undefined' ||
                typeof req.body.bulk_minimum_items === 'undefined' ||
                typeof req.body.bulk_product_price === 'undefined' ||
                typeof req.body.stock_amount === 'undefined' ||
                typeof req.body.stock_status === 'undefined' ||
                req.body.payment_methods.length === 0 ||
                req.body.ordering_methods.length === 0 ||
                typeof req.body.product_categories === 'undefined')
            console.log(typeof req.params.id === 'undefined' ,
                typeof req.params.shop_id === 'undefined' ,
                typeof req.body.product_name === 'undefined' ,
                typeof req.body.product_description === 'undefined' ,
                typeof req.body.product_price === 'undefined' ,
                typeof req.body.product_discount === 'undefined' ,
                typeof req.body.visibility === 'undefined' ,
                typeof req.body.product_options === 'undefined' ,
                typeof req.body.bulk_minimum_items === 'undefined' ,
                typeof req.body.bulk_product_price === 'undefined' ,
                typeof req.body.stock_amount === 'undefined' ,
                typeof req.body.stock_status === 'undefined' ,
                req.body.payment_methods.length === 0 ,
                req.body.ordering_methods.length === 0 ,
                typeof req.body.product_categories === 'undefined')
            throw { error_msg: "form incomplete" }
        }


        decoded = jwt.decode(req.body.token)
        // console.log(req.body)

        t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(404).send({ msg: 'cannot update tailor not exists' })
        }
        ts = await tailor_shop.findOne({
            _id: req.params.shop_id,
            tailor_id: t._id
        })

        if (!ts || ts === null) {
            return res.status(404).send({ msg: 'cannot update, this shop does not exists' })
        }
        p = await product.findOne({
            _id: req.params.id,
            shop_id: req.params.shop_id
        })

        if (!p || p === null) {
            return res.status(404).send({ msg: 'cannot update, this product does not exists' })
        }

        r = await product.findOneAndUpdate({ _id: req.params.id, shop_id: req.params.shop_id }, {
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            discount: req.body.product_discount,
            visibility: req.body.visibility,
            product_options: req.body.product_options,
            payment_methods: req.body.payment_methods,
            ordering_methods: req.body.ordering_methods,
            product_categories: req.body.product_categories,
            bulk_minimum_items: req.body.bulk_minimum_items,
            bulk_product_price: req.body.bulk_product_price,
            stock_amount: req.body.stock_amount,
            stock_status: req.body.stock_status,

        })

        if (!r || r === null) {
            throw { error_msg: 'something went wrong at saving' }
        }
        res.send({ message: "update successful" })

    }
    catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "error at server" })

    }

}

module.exports = edit_product