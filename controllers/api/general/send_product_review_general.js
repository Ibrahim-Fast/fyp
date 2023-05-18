const send_product_review_general = async (req, res) => {
    try {
        res.send({message:"not implemented now"})
    } catch (e) {
        console.log(e)

        res.status(500).send({ error_msg: r.error_msg })
    }

}

module.exports=send_product_review_general