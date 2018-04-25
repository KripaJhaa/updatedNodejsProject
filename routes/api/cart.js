const carts = require('../../db').Cart
const user = require('../../db').User
const product = require('../../db').Product
const route = require('express').Router()
const path = require('path')

let cartList = []

// route.post('/',(req,res)=>{
//     console.log("a balnk post to ")
    
// })
route.get('/', (req, res) => {
console.log("cart get")
console.log("Inside getlist...."+parseInt(req.session.passport.user));
//console.log("Inside getlist...."+req.body)
    getList(req)
        .then(() => {
            res.status(200).json(cartList)
        })
        .catch((err) => {
            console.log("Error " + err)
        })

})

async function getList(req) {
    //console.log("Inside getlist...."+req.body)
        let uId=parseInt(req.session.passport.user)

    let selectedCartList = await carts.findAll({where:{ userId:uId}})
    
    cartList = []

    console.log("List of Product Id")

    for(element of selectedCartList){

            console.log(element.productId+" ")

            let productList =  await product.findOne({where:{ id:element.productId}})

            cartList.push({
            productName: productList.name,
            productPrice: productList.price,
            quantity: element.quantity,
            productId: element.productId
            })

            console.log(" product name "+productList.name)

    };
}


route.post('/minusProduct', (req, res) => {
   // console.log("inside cart post call" + req.body.name + " <> " + req.body.price + " " + req.body.productId)

   let uId=parseInt(req.session.passport.user)
    carts.findOne({
            where: {
                productId: parseInt(req.body.productId),
                userId:parseInt(uId)
            }
        })
        .then((cart) => {
            if (cart && cart.quantity > 0) {
                cart.quantity--;
                cart.save()
            } else {
                cart.destroy({
                    where: {
                        productId: parseInt(req.body.productId),
                        userId:parseInt(uId)
                    }
                });
            }
        })

        res.json({
            success: true
        })
})


route.post('/removeProduct', (req, res) => {
    //console.log("inside cart post call" + req.body.name + " <> " + req.body.price + " " + req.body.productId)

    let uId=parseInt(req.session.passport.user)

    carts.findOne({
            where: {
                productId: parseInt(req.body.productId),
                userId:parseInt(uId)
            }
        })
        .then((cart) => {
                if(cart){
                cart.destroy({
                    where: {
                        productId: parseInt(req.body.productId),
                        userId:parseInt(uId)
                    }
                });
            }
            else{
                console.log("element not present")
            }
            
        })

        res.json({
            success: true
        })
})

route.post('/addToCart', (req, res) => {
    console.log("cart check "+req.user)
    
    let uId=parseInt(req.session.passport.user)
    //console.log("Inside AddToCart post call: " + req.body.name + " <> " + req.body.price + " " + req.body.productId)

   // console.log("inside cart "+req.body.userId)
    if(uId){

    carts.findOne({
            where: {
                productId: parseInt(req.body.productId),
                userId:parseInt(uId)
            }
        })
        .then((cart) => {
            if (cart) {
                cart.quantity++
                    cart.save()
            } else {
                const productCartAdd = new carts({
                    productId: parseInt(req.body.productId),
                    userId:parseInt(uId),
                    quantity: 1
                })
                productCartAdd.save()
            }
        })
    res.json({
        success: true
    })
}
else{
    res.json({message:"You are not logged in"})
}
})




exports = module.exports = route