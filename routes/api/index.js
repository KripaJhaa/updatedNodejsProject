const route = require('express').Router()
const product = require('../../db').Product


route.use('addproduct', require('./addproduct'))
route.use('addtocart', require('./cart'))
route.use('addvendor', require('./addvendor'))
//route.use('account', require('./account'))
//route.use('passport', require('./passport'))


let ProductList = []
let id=0

route.get('/', (req, res) => {
    console.log("Get called in index.js")
    console.log(req.session)
    if(req.user){
        id=req.user.dataValues.id
    }
    getProducts()
        .then(() => {
            console.log("list of Product rendered")
            console.log({ products: ProductList,userId :id })
            res.status(200).json({ products: ProductList,userId :id })
        })
        .catch((err) => {
            console.log("Error " + err)
            res.status(500).json({
                error: err
            })
        })
    
    
})


async function getProducts() {

    let productList = await product.findAll({
        include: {
            all: true
        }
    })

    ProductList = []
    productList.forEach(element => {

        console.log(element.name + " <> " + element.price + " <> " + element.id)

        ProductList.push({
            name: element.name,
            price: element.price,
            vendorId: element.vendorId,
            productId: element.id
        })
    });
}

route.post('/', (req, res) => {
    res.redirect('public/addProduct.html');
})

exports = module.exports = {
    route
}