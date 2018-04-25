let cartApp = new Vue({
    el: "#cartPage",
    data: {
        cartProducts: []
    },
    created: function () {
        this.fetchCart()
    },
    computed: {

        itemCount: function () {
            var count = 0;

            for (var i = 0; i < this.cartProducts.length; i++) {
                count += parseInt(this.cartProducts[i].quantity) || 0;
            }

            return count;
        },
        subTotal: function () {
            var subTotal = 0;

            for (var i = 0; i < this.cartProducts.length; i++) {
                subTotal += this.cartProducts[i].quantity * this.cartProducts[i].price;
            }

            return subTotal;
        },
        totalPrice: function () {
            return this.subTotal;
        }
    },
    filters: {
        currencyFormatted: function (value) {
            return Number(value).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
        }
    },


    methods: {
        removeItem: function (index) {
            
            axios.post('http://localhost:5678/cart/removeProduct', {
                    productId: parseInt(this.cartProducts[index].productId)
                })
                .then((req, res) => {
                    this.cartProducts.splice(index, 1)
                    window.location.href = "MyCartPage.html"
                })
                .catch((err) => {
                    console.log("Error Occured " + err)
                })

                

        },
        updateQuantity: function (index, event) {
            var value = event.target.value;
            var product = this.products[index];

            // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
            if (value === "" || (parseInt(value) > 0 && parseInt(value) < 100)) {
                product.quantity = value;
            }

            this.$set(this.products, index, product);
        },
        checkQuantity: function (index, event) {
            // Update quantity to 1 if it is empty
            if (event.target.value === "") {
                var product = this.products[index];
                product.quantity = 1;
                this.$set(this.products, index, product);
            }
        },
        plus(index) {
            this.cartProducts[index].quantity++;

            axios.post('http://localhost:5678/cart/addToCart', {
                    productId: parseInt(this.cartProducts[index].productId),
                
                })
                .then((req, res) => {
                    window.location.href = "MyCartPage.html"
                })
                .catch((err) => {
                    console.log("Error Occured " + err)
                })
        },
        minus(index) {
            this.cartProducts[index].quantity--;

            axios.post('http://localhost:5678/cart/minusProduct', {
                    productId: parseInt(this.cartProducts[index].productId)
                })
                .then((req, res) => {
                    window.location.href = "MyCartPage.html"
                })
                .catch((err) => {
                    console.log("Error Occured " + err)
                })

        },
        fetchCart() {
                
            axios.get('/cart')
                .then((req, res) => {
                    cartApp.cartProducts = []

                    let MycartProducts = req.data

                    for (item in MycartProducts) {

                        //alert(req.data[item].productPrice)

                        cartApp.cartProducts.push({
                            name: req.data[item].productName,
                            price: req.data[item].productPrice,
                            quantity: req.data[item].quantity,
                            productId: req.data[item].productId
                        })
                    }

                })
        }


    }

})