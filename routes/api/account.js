const express = require('express')
const path = require('path')
const User = require('../../db').User
const session = require('express-session')
const passport = require('../../passport')
const route = express.Router()

route.use(express.json())
route.use(express.urlencoded({ extended: true }))

route.use(session({
    secret: 'some very very secret thing',
    resave: false,
    saveUninitialized: true
}))

route.use(passport.initialize())
route.use(passport.session())

route.use('/', express.static(path.join(__dirname, 'public')))


// route.get('/signup',(req,res)=>{
//     res.sendFile('./login.html')
// })

route.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        if (user) {
            res.redirect('/login.html')
        }
    }).catch((err) => res.send("ERROR CREATING USER"))
})

route.post('/signin', passport.authenticate('local', {    
    failureRedirect: '/login.html',
    successRedirect: '/index.html'
}))


route.get('/profile', (req, res) => {
    // Available to only logged in people
    // Data is different (each user sees own profile)
    console.log(req.user)
    if (req.user) {
        res.json(req.user)
    } else {
        res.send("YOU ARE NOT LOGGED IN")
    }

})

exports = module.exports = route


