let app = new Vue({
    el: '#productApp',
    data: {
        productName: '',
        vendorId: '',
        Price: '',
        vendors: []
    },
    created: function () {
        this.fetch()
    },
    methods: {
        AddToDb() {

            axios.post('http://localhost:5678/addproduct', {
                    name: app.productName,
                    vendorId: app.vendorId,
                    price: app.Price,
                })
                .then(function (response) {
                    console.log(" item  saved  done")
                    axios.get('http://localhost:5678/api')
                        .then((req, res) => {
                            window.location.href = "index.html"
                            console.log("redirect back to home")
                        })
                        .catch((error) => {
                            console.log("Error " + error)
                        })
                })
        },
        fetch() {
            axios.get('/addproduct', (req, res) => {
                    console.log("vendor fetched..")
                })
                .then((req, res) => {
                    let listOfVendor = req.data

                    app.vendors = []
                    for (item in listOfVendor) {
                        console.log("vendor get id " + req.data[item].id)
                        app.vendors.push({
                            name: req.data[item].name,
                            id: req.data[item].id
                        })
                    }


                })
        }


    }

})