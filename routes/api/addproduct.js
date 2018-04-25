const product = require('../../db').Product
const vendor = require('../../db').Vendor
const route = require('express').Router()


let vendors = []

route.get('/', (req, res) => {

    getListOfVendor()
        .then(() => {
            console.log("list of vendor fetched")
            res.status(200).json(vendors)
        })
        .catch((err) => {
            console.log("Error Occured" + err)
        })

})

async function getListOfVendor() {

    const listOfVendor = await vendor.findAll({})
    this.vendors = []
    listOfVendor.forEach(element => {
        vendors.push({
            name: element.name,
            id: element.id
        })
    });

}


route.post('/', (req, res) => {
    console.log("Post called Congo")
    console.log("Vendor id selected " + req.body.vendorId)
    const productAdd = new product({
        name: req.body.name,
        price: parseFloat(req.body.price),
        vendorId: parseInt(req.body.vendorId)
    })

    productAdd.save()

    console.log(" data saved " + productAdd)

    res.json({
        success: true,
        id: productAdd.length - 1
    })

    // res.redirect('http://localhost:5678/api')

})

exports = module.exports = route