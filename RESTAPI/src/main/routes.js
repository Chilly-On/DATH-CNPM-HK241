const {Router} = require('express')
const controller = require('./controller')

const router = Router()

// router.get("/", (req, res)=>{
//     res.send("using api routes")
// })
router.get("/employee/", controller.getEmployee)
router.get("/report/", controller.getReport)
router.get("/employee/:ssn", controller.getEmployeeById)
router.get("/report/:uuid", controller.getReportById)
router.post("/employee/", controller.addEmployee)
router.post("/report/", controller.AddReport)
router.delete("/employee/:ssn", controller.removeEmployee)
router.delete("/report/:uuid", controller.removeReport)

module.exports=router
