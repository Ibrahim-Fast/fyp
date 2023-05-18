const tailor_shop = require('../../../../models/tailor_shop')
const product = require('../../../../models/product')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')
const image_model = require('../../../../models/image')
const get_thumbnail_Base64 = require('../../../../utils/get_image_thumbnail_string')



const add_product = async (req, res) => {
    try {

        if (typeof req.body.product_name === 'undefined' ||
            typeof req.body.product_description === 'undefined' ||
            typeof req.body.product_price === 'undefined' ||
            typeof req.body.product_options === 'undefined' ||
            typeof req.body.payment_methods === 'undefined' ||
            typeof req.body.ordering_methods === 'undefined' ||
            typeof req.body.shop_id === 'undefined' ||
            typeof req.body.product_categories === 'undefined' ||
            req.files.length === 0) {

            throw "incomplete"
        }

        header_token = req.headers['authorization']
        const token = header_token && header_token.split(' ')[1]
        decoded = jwt.decode(token)

        t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(404).send({ msg: 'cannot add tailor not exists' })
        }
        ts = await tailor_shop.findOne({
            _id: req.body.shop_id,
            tailor_id: t._id
        })
        if (!ts || ts === null) {
            return res.status(404).send({ msg: 'cannot add shop not exists' })
        }

        let image_data = []
        for (let i = 0; i < req.files.length; i++) {
            if (!(req.files[i].mimetype && req.files[i].mimetype.includes('image') && (req.files[i].mimetype.includes('png') || req.files[i].mimetype.includes('jpg') || req.files[i].mimetype.includes('jpeg')))) {
                return res.status(400).send({ msg: 'one or more wrong file may be selected, ensure that image file has extension such as png,jpg or jpeg are selected and retry' })
            }
            image_data.push({ uploaded_by: token, mimetype: req.files[i].mimetype, data: req.files[i].buffer.toString('base64') })
        }

        const image_save = await image_model.insertMany(image_data)
        if (!image_save || image_save === null) {
            return res.status(404).send({ msg: 'cannot add server encountered error when completing requests' })
        }

        const backgroundColor = { r: 255, g: 255, b: 255, alpha: 1 }; // white background color
        let thumbnail = await get_thumbnail_Base64(image_save[0].data, 1, 1, backgroundColor)
        thumbnail = `data:${image_save[0].mimetype};base64,${image_save[0].data}`

        // console.log('here',thumbnail)
        let image_links = []
        for (let i = 0; i < image_save.length; i++) {
            image_links.push('/g/image/' + image_save[i]._id)
        }


        r = await product.create({
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            product_options: req.body.product_options,
            payment_methods: req.body.payment_methods,
            ordering_methods: req.body.ordering_methods,
            shop_id: req.body.shop_id,
            thumbnail: thumbnail,
            tailor_id: t._id,
            product_images: image_links,
            product_categories: req.body.product_categories
        })

        if (!r || r === null) {
            return res.status(500).send({ msg: 'could not save, error at saving' })
        }
        return res.status(200).send({ msg: 'product added successfully' })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(500).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: JSON.stringify(e) })

    }

}

module.exports = add_product