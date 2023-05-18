const email_regex_util = require('../utils/email_regex')
const email_regex = async (req, res, next) => {
    try {
        if (!req.body.email) {
            return res.status(400).send({ error: true, error_msg: 'incomplete entry no email' })
        }
        if (email_regex_util(req.body.email)) {
            return next()
        } else {
            return res.status(400).send({ error: true, error_msg: 'wrong email' })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).send({ error: true, error_msg: 'server error' })

    }

}

module.exports = email_regex