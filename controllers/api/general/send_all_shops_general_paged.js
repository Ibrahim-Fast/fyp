const tailor_shop = require("../../../models/tailor_shop")

const send_all_tailor_shops_paged = async (req, res) => {
    try {

        page = parseInt(req.params.page)
        if (isNaN(page) || page === 0) {
            throw { error_msg: "Invalid page" }
        }


        total  = await tailor_shop.countDocuments({ status: 1, visibility: 1 })
        // console.log(req.params.page,total)
        if (Math.ceil(page / 10) * 10 > total && page !== 1) {
            throw { error_msg: "no more results" }
        }
        // if ((page * 10) > total && page !== 1) {
         

        results = await tailor_shop.find({status: 1, visibility: 1 }, ["-updatedAt", "-__v", "-tailor_id", "-shop_pictures","-shop_schedule"]).skip((page - 1) * 10).limit(10)
        if (results === null || !results) {
            // console.log("no tailor_shops")
            return res.send({ results: results })
        }
        res.send({ results: results, current: 10 * page, of: total, next: total > page * 10 ? true : false, previous: page > 1 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        else return res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_tailor_shops_paged