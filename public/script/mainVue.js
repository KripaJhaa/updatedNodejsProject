let app = new Vue({
    el: '#app',
    data: {
        selectedProduct:'',
        products: [],
        userId:''
    },
    created: function () {
        this.load()
    },
    methods: {
        addProduct() {
            window.location.href = "addProduct.html"
        },
        load() {     
                 
            axios.get('/api')
                .then((req, res) => {
                    var products = req.data.products
                    app.products = []
                   // app.userId=req.user.id
                   let uId=req.data.userId

                   console.log(" userId in product "+uId)
                   
                   if(uId!=0){ 
                   app.userId=uId
                   }

                    for (items in products) {
                        app.products.push({
                            name: req.data.products[items].name,
                            price: req.data.products[items].price,
                            productId:req.data.products[items].productId
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error " + err)
                })
        },
        addToCart(product){
            axios.post('/cart/addToCart',{
                    name:product.name,
                    price: parseFloat(product.price),
                    productId:parseInt(product.productId),
                    userId:parseInt(app.userId)
            }
            )
            .then((req,res)=>{
                if(req.data.message){
                    alert("You are not logged in")
                }
                else{
                     window.location.href = "MyCartPage.html"
                   
                }
            })
            .catch((err)=>{
                console.log("Error Occured "+err)
            })
        },
        myCart(){
            window.location.href = "MyCartPage.html"
        },
        login(){
            window.location.href = "login.html"
        },
        signUp(){
            window.location.href="signup.html"
        }


    }
})