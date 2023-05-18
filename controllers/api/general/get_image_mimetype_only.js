const image_model = require('../../../models/image')
const mongoose = require('mongoose')

const get_image = async (req, res) => {
    try { 
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID LINK" }
        }
        const image = await image_model.findById(req.params.id,['mimetype','-_id'])
        if(!image){
            throw { error_msg: "INVALID LINK" }
        }
        res.send(image.mimetype)
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        return res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = get_image