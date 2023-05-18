const jwt = require('jsonwebtoken')
const image_model = require('../../../models/image')

const upload_image = async (req, res) => {
    try {
        header_token = req.headers['authorization']
        const token = header_token && header_token.split(' ')[1]
        decoded = jwt.decode(token)
        // console.log(req.body)
        if (req.file.mimetype.includes('png') || req.file.mimetype.includes('jpg') || req.file.mimetype.includes('jpeg')) {
            const saved_image = await image_model.create({
                mimetype: req.file.mimetype,
                data: req.file.buffer.toString('base64'),
                uploaded_by: token
            }
            )
            res.send({ url: `/g/image/${saved_image._id}` })
        } else {
            throw { error_msg: "wrong image type only send png,jpg or jpeg" }
        }

    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        return res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = upload_image