const product = require('../../db').Product
const vendor = require('../../db').Vendor
const route = require('express').Router()


route.get('/',(req,res)=>{
    console.log(req.body.name)
    
    let obj= new vendor({
         name:req.query.name
    })

    obj.save()
})


exports = module.exports = route