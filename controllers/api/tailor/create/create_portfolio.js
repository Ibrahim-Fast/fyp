const tailor_portfolio = require('../../../../models/tailor_portfolio')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')



const add_product = async (req, res) => {
    try {
        if (typeof req.body.gender === 'undefined' ||
            typeof req.body.date_of_birth === 'undefined' ||
            typeof req.body.city === 'undefined'
        ) {
            console.log(typeof req.body.gender === 'undefined',
                typeof req.body.date_of_birth === 'undefined',
                typeof req.body.city === 'undefined')
            throw "incomplete"
        }
        let description = ''
        if (typeof req.body.description === 'undefined') {
            description = ''
        } else {
            description = req.body.description
        }


        header_token = req.headers['authorization']
        const token = header_token && header_token.split(' ')[1]
        decoded = jwt.decode(token)

        t = await tailor.findOne({ email: decoded.email })
        if (!t || t === null) {
            return res.status(409).send({ msg: 'cannot add tailor not exists' })
        }
        tp = await tailor_portfolio.findOne({
            tailor_id: t._id
        })
        if (tp || tp !== null) {
            return res.status(409).send({ msg: 'cannot add already exists' })
        }

        r = await tailor_portfolio.create({
            tailor_id: t._id,
            date_of_birth: req.body.date_of_birth,
            description: description,
            city: req.body.city,
            search_tags: req.body.search_tags,
            social_media_links: req.body.social_media_links
        })

        if (!r || r === null) {
            return res.status(500).send({ msg: 'could not save, error at saving' })
        }
        return res.status(200).send({ msg: 'portfolio created successfully' })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(500).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: JSON.stringify(e) })

    }

}

module.exports = add_product