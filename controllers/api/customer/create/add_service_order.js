const customer = require('../../../../models/customer')
const service = require('../../../../models/service')
const tailor_shop = require('../../../../models/tailor_shop')
const tailor = require('../../../../models/tailor')
const service_order = require('../../../../models/service_order')
const jwt = require('jsonwebtoken')

const add_service_order = async (req, res) => {
    try {

        const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
        c = await customer.findOne({ email: decoded.email })
        if (c === null || !c) {
            console.log("customer not exists")
            throw { error_msg: "customer does not exists" }
        }
        tailor_check = await tailor.findOne({ _id: req.body.tailor_id })
        if (!tailor_check || tailor_check === null) {
            return res.status(404).send({ msg: 'cannot add tailor not exists' })
        }

        tailor_shop_check = await tailor_shop.findOne({ _id: req.body.shop_id, tailor_id: req.body.tailor_id })
        if (!tailor_shop_check || tailor_shop_check === null) {
            return res.status(404).send({ msg: 'cannot add shop not exists with such tailor' })
        }

        if (req.body.selected_services === null || req.body.selected_services.length === 0) {
            return res.status(404).send({ msg: 'cannot add no services selected' })
        }

        check_array = []
        var final_discount = 0;
        var final_cost = 0;
        var payment_check = 0;
        var ordering_type_check = 0;

        for (const i of req.body.selected_services) {
            service_check = await service.findOne(
                {
                    _id: i.service_id,
                    shop_id: req.body.shop_id,
                    ordering_types_allowed: { "$elemMatch": { type_name: req.body.ordering_type.type_name } },
                    service_payment_methods_allowed: { "$elemMatch": { type_name: req.body.payment_method.type_name } },
                    service_costs: { "$elemMatch": { service_sub_type_name: i.service_sub_type } }
                },
                ["_id", "ordering_types_allowed", "service_payment_methods_allowed", "service_costs", "status"])
            if (service_check) {
                ordering_type_check = service_check.ordering_types_allowed.filter(e => {
                    return req.body.ordering_type.type_name === e.type_name
                })[0]
                if (!ordering_type_check) {
                    return res.status(400).send({ error: true, error_msg: "wrong ordering type selected the service does not support it" })
                }
                payment_check = service_check.service_payment_methods_allowed.filter(e => {
                    return req.body.payment_method.payment_name === e.payment_name
                })[0]

                if (!payment_check) {
                    return res.status(400).send({ error: true, error_msg: "wrong payment method selected the service does not support it" })
                }
                cost = service_check.service_costs.filter(e => {
                    return e.service_sub_type_name === i.service_sub_type
                })[0]
                check_array.push({ associated_costs: cost, id: i.service_id, type_name: i.service_sub_type, quantity: i.quantity, result: true })
            } else {
                check_array.push({ id: i.service_id, type_name: i.service_sub_type, result: false })
            }
        }

        bad_services = check_array.filter(e => e.result === false)
        if (bad_services.length !== 0) {
            console.log(bad_services)
            return res.status(400).send({ error: true, error_msg: "non existent services added relative to shop remove them", bad_services })
        }

        for (j of check_array) {
            final_cost += (j.associated_costs.cost - (j.associated_costs.cost * j.associated_costs.discount)) * j.quantity
        }

        final_discount += payment_check.discount
        final_discount += ordering_type_check.discount

        let service_order_saved = await service_order.create({
            shop_id: req.body.shop_id,
            tailor_id: req.body.tailor_id,
            selected_services: req.body.selected_services,
            payment_method: req.body.payment_method,
            ordering_type: req.body.ordering_type,
            final_cost: final_cost,
            final_discount: final_discount, 
            customer_id: c._id,
            status: 0
        })

        if (!service_order_saved) {
            throw "could not save"
        }

        return res.send({ message: "service order recieved " })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: JSON.stringify(e) })
    }

}

module.exports = add_service_order