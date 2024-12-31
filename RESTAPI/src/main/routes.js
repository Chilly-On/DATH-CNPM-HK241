const {Router} = require('express')
const controller = require('./controller')

const router = Router()

// using api routes
router.get("/", controller.homepage)

module.exports=router
