const product = require("../../../models/product")

const send_all_products_paged = async (req, res) => {
    try {

        page = parseInt(req.params.page)
        if (isNaN(page) || page === 0) {
            throw { error_msg: "Invalid page" }
        }


        total  = await product.countDocuments({ status: 1, visibility: 1 })
        // console.log(req.params.page,total)
        if (Math.ceil(page / 10) * 10 > total && page !== 1) {
            throw { error_msg: "no more results" }
        }
        // if ((page * 10) > total && page !== 1) {
         

        results = await product.find({status: 1, visibility: 1 }, ["-updatedAt", "-__v", "-tailor_id", "-product_images"]).skip((page - 1) * 10).limit(10)
        if (results === null || !results) {
            // console.log("no products")
            return res.send({ results: results })
        }
        res.send({ results: results, current: 10 * page, of: total, next: total > page * 10 ? true : false, previous: page > 1 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        else return res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_products_paged