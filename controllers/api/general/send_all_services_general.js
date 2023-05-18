const service = require("../../../models/service")

const send_all_services = async (req, res) => {
    try {

        let page = 1


        total = results = await service.countDocuments({ status: 1, visibility: 1 })
        if ((page * 10) > total && page !== 1) {
            throw { error_msg: "no more results" }
        }
        // console.log(total)
        results = await service.find({status: 1, visibility: 1 }, ["-updatedAt","-createdAt",'-service_description' ,"-__v",  "-service_images","-status",'-visibility']).skip((page - 1) * 10).limit(10)
        if (results === null || !results) {
            // console.log("no services")
            return res.send({ results: results })
        }
        res.send({ results: results, current: 10 * page, of: total, next: total > page * 10 ? true : false, previous: page > 1 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        else return res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_services