const image_token_generator = require('./../../../configs/generate_image_token')

const send_image_token = async (req, res) => {
    try {
        const t = await image_token_generator()
        res.send({ image_token: t })
    } catch (e) {
        console.log(e)

        res.status(500).send({ error_msg: r.error_msg })
    }

}

module.exports = send_image_token