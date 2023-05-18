const tailor = require('../../../../models/tailor')
const portfolio = require('../../../../models/tailor_portfolio')
const jwt = require('jsonwebtoken')


const update_portfolio = async (req, res) => {
    try {
        if (
            typeof req.body.city === 'undefined' ||
            typeof req.body.description === 'undefined' ||
            typeof req.body.other_contacts === 'undefined' ||
            typeof req.body.search_tags === 'undefined' ||
            typeof req.body.social_media_links === 'undefined' ||
            typeof req.body.visibility === 'undefined') {
            throw { error_msg: "form incomplete" }
        }


        decoded = jwt.decode(req.body.token)
        // console.log(req.body)

        t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(404).send({ msg: 'cannot update tailor not exists' })
        }

        r = await portfolio.findOneAndUpdate({ tailor_id: t._id }, {
            city: req.body.city,
            description: req.body.description,
            other_contacts: req.body.other_contacts,
            search_tags: req.body.search_tags,
            social_media_links: req.body.social_media_links,
            visibility: req.body.visibility

        })

        if (!r || r === null) {
            throw { error_msg: 'something went wrong at saving' }
        }
        res.send({ message: "updated successfully" })

    }
    catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "error at server" })

    }

}

module.exports = update_portfolio