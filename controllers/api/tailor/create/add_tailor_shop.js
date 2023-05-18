const tailor = require('../../../../models/tailor')
const tailor_shop = require('../../../../models/tailor_shop')
const jwt = require('jsonwebtoken')
const image_model = require('../../../../models/image')
const get_thumbnail_Base64 = require('../../../../utils/get_image_thumbnail_string')


const add_tailor_shop = async (req, res) => {
    try {
        if (!req.body.shop_name || !req.body.shop_address || !req.body.shop_address_link || !req.body.shop_type || req.files.length === 0) {
            return res.status(400).send({ msg: 'incomplete' })
        }

        header_token = req.headers['authorization']
        const token = header_token && header_token.split(' ')[1]
        decoded = jwt.decode(token)


        let image_data = []
        for (let i = 0; i < req.files.length; i++) {
            if (!(req.files[i].mimetype && req.files[i].mimetype.includes('image') && (req.files[i].mimetype.includes('png') || req.files[i].mimetype.includes('jpg') || req.files[i].mimetype.includes('jpeg')))) {
                return res.status(400).send({ msg: 'one or more wrong file may be selected, ensure that image file has extension such as png,jpg or jpeg are selected and retry' })
            }
            image_data.push({ uploaded_by: token, mimetype: req.files[i].mimetype, data: req.files[i].buffer.toString('base64') })
        }
        // console.log(image_data.length)

        
        let t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(404).send({ msg: 'cannot add tailor not exists' })
        }


        const image_save = await image_model.insertMany(image_data)
        if (!image_save || image_save === null) {
            return res.status(404).send({ msg: 'cannot add server encountered error when completing requests' })
        }

        const backgroundColor = { r: 255, g: 255, b: 255, alpha: 1 }; // white background color
        let thumbnail = await get_thumbnail_Base64(image_save[0].data, 1, 1, backgroundColor)
        thumbnail = `data:${image_save[0].mimetype};base64,${image_save[0].data}`


        let image_links = []
        for (let i = 0; i < image_save.length; i++) {
            image_links.push('/g/image/' + image_save[i]._id)
        }

        s = await tailor_shop.create({
            visibility: 0,
            thumbnail:thumbnail,
            shop_name: req.body.shop_name,
            shop_address: req.body.shop_address,
            shop_address_link: req.body.shop_address_link,
            shop_pictures: image_links,
            shop_type: req.body.shop_type,
            status: 0,
            tailor_id: t._id
        })
        // console.log(t)
        if (!s || s === null) {
            return res.status(500).send({ msg: 'could not save' })
        }
        return res.status(200).send({ msg: 'shop added successfully' })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(500).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: e })

    }

}

module.exports = add_tailor_shop