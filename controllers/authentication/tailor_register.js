const tailor = require('../../models/tailor')
const bcrypt = require('bcryptjs')
const tailor_register = async (req, res) => {
    try {
        if (!req.body.password || !req.body.email || !req.body.first_name || !req.body.last_name || !req.body.mobile) {
            throw 'incomplete'
        }
        password = await bcrypt.hash(req.body.password, 10)
        const c = await tailor.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password,
            mobile: req.body.mobile
        })
        if (!c) {
            throw "something went wrong"
        }
        return res.status(200).send({ error: false, message: "registered successfully" })
    }
    catch (e) {
        let error_msg = ""
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
module.exports = tailor_register