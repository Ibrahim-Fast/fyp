const jwt = require('jsonwebtoken')
const admin = require('../../models/admin')
const bcrypt = require('bcryptjs')

const admin_register = async (req, res) => {
    try {

        decoded_token = jwt.decode(req.body.token)
        // console.log(decoded_token.email)

        let temp = await admin.find({ email: decoded_token.email })
        if (temp.length === 0) {
            return res.sendStatus(401).send({ error: true, "error_msg": "unauthorized" })
        }
        temp = temp[0]

        if (!req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name || !req.body.privelege_rank) {
            throw 'incomplete'
        }

        if (temp.privelege_rank >= req.body.privelege_rank) {
            return res.status(401).send({ error: true, "error_msg": "unauthorized, cannot create higher privelges account, current priveleges insufficient" })
        }
        password = await bcrypt.hash(req.body.password, 10)
        const c = await admin.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password,
            mobile: req.body.mobile,
            created_by: temp._id,
            privelege_rank: req.body.privelege_rank
        })
        if (!c) {
            throw "something went wrong"
        }
        return res.status(200).send({ error: false, message: "registered successfully" })

    }
    catch (e) {
        let error_msg = ""
        // console.log(JSON.stringify(e));
        console.log(e);
        if (e === 'incomplete') {
            return res.status(400).send({ error: true, error_msg: e })
        }
        if (e.code === 11000) {
            error_msg += Object.keys(e.keyValue)[0] + " already taken"
        } else {
            for (i in e.errors) {
                console.log(e.errors[i].path + ' ' + e.errors[i].kind);
                error_msg += e.errors[i].path + ' ' + e.errors[i].kind + ','
            }
        }
        if (error_msg !== "") {
            return res.status(400).send({ error: true, error_msg: error_msg })
        } else {
            return res.status(500).send({ error: true, error_msg: "could not process" })
        }
    }

}
module.exports = admin_register