const service = require('../../../../models/service')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')
const tailor_shop = require('../../../../models/tailor_shop')


const edit_service = async (req, res) => {
    try {
        if (typeof req.params.id === 'undefined' ||
            typeof req.params.shop_id === 'undefined' ||
            typeof req.body.service_name === 'undefined' ||
            typeof req.body.service_description === 'undefined' ||
            typeof req.body.service_price === 'undefined' ||
            typeof req.body.service_discount === 'undefined' ||
            typeof req.body.visibility === 'undefined' ||
            typeof req.body.service_options === 'undefined' ||
            req.body.payment_methods.length === 0 ||
            req.body.ordering_methods.length === 0 ||
            typeof req.body.service_categories === 'undefined') {
            // console.log(
            // typeof req.params.id === 'undefined' ,
            // typeof req.params.shop_id === 'undefined' ,
            // typeof req.body.service_name === 'undefined' ,
            // typeof req.body.service_description === 'undefined' ,
            // typeof req.body.service_price === 'undefined' ,
            // typeof req.body.service_discount === 'undefined' ,
            // typeof req.body.visibility === 'undefined' ,
            // typeof req.body.service_options === 'undefined' ,
            // req.body.payment_methods.length === 0 ,
            // req.body.ordering_methods.length === 0 ,
            // typeof req.body.service_categories === 'undefined'
            // )
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
        p = await service.findOne({
            _id: req.params.id,
            shop_id: req.params.shop_id
        })

        if (!p || p === null) {
            return res.status(404).send({ msg: 'cannot update, this service does not exists' })
        }

        r = await service.findOneAndUpdate({ _id: req.params.id, shop_id: req.params.shop_id }, {
            service_name: req.body.service_name,
            service_description: req.body.service_description,
            service_price: req.body.service_price,
            discount: req.body.service_discount,
            visibility: req.body.visibility,
            service_options: req.body.service_options,
            payment_methods: req.body.payment_methods,
            ordering_methods: req.body.ordering_methods,
            service_categories: req.body.service_categories
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

module.exports = edit_service