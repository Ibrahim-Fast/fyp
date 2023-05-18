const tailor = require("../../../../models/tailor")
const tailor_shop = require("../../../../models/tailor_shop")
const jwt = require("jsonwebtoken")

const update_tailor_shop_info = async (req, res) => {
    try {
        if (typeof req.body.shop_name === 'undefined' ||
            typeof req.body.shop_address === 'undefined' ||
            typeof req.body.shop_address_link === 'undefined' ||
            typeof req.body.shop_description === 'undefined' ||
            typeof req.body.visibility === 'undefined' ||
            typeof req.body.shop_type === 'undefined' ||
            typeof req.body.other_contacts === 'undefined' ||
            typeof req.body.shop_schedule === 'undefined') {
            throw { error_msg: "Incomplete information cannot update" }
        }
        decoded = jwt.decode(req.body.token)
        // console.log(req.body)

        t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(404).send({ msg: 'cannot add tailor not exists' })
        }
        ts = await tailor_shop.findOne({
            _id: req.params.id,
            tailor_id: t._id
        })

        if (!ts || ts === null) {
            return res.status(404).send({ msg: 'cannot add, this shop does not exists' })
        }

        for (let i = 0; i < req.body.other_contacts.length; i++) {
            let v = req.body.other_contacts[i].contact_number.toString()
            
            if (!(v.length === 13 && v.includes('+') && v.match(/\+/g).length === 1)) {
                throw { error_msg: "WRONG NUMBER FORMAT NUMBER MUST BE 13 DIGITS AND INCLUDE COUNTRY CODE i.e 03321234567 should be written in +923321234567, +92 is country code for Pakistan " }
            }
        }

        r = await tailor_shop.findOneAndUpdate({ _id: req.params.id, tailor_id: t._id }, {
            shop_name: req.body.shop_name,
            shop_address: req.body.shop_address,
            shop_address_link: req.body.shop_address_link,
            visibility: req.body.visibility,
            shop_type: req.body.shop_type,
            shop_description:req.body.shop_description,
            other_contacts: req.body.other_contacts,
            shop_schedule: req.body.shop_schedule
        })
        // console.log(req.params.id)
        // console.log(r)
        if (!r || r === null) {
            return res.status(500).send({ error_msg: 'update failed' })
        }

        res.send({ message: "update successful" })

    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "error at server" })

    }

}

module.exports = update_tailor_shop_info