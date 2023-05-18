const express=require('express')


const router=express.Router()

router.get('/',async (req,res)=>{
    res.send({message:"THIS WILL GET BUILT APP"})
})

router.post('/',require('./../controllers/api/general/token_handle'))

module.exports=router
