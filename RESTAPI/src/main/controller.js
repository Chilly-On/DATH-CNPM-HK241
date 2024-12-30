const pool = require("../../db")
const queries = require("./queries")


const getEmployee = (req, res)=>{
    pool.query(queries.getEmployee, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getReport = (req, res)=>{
    pool.query(queries.getReport, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
}

const getEmployeeById= (req, res)=>{
    const ssn = parseInt(req.params.ssn)
    pool.query(queries.getEmployeeById, [ssn], (error, results)=>{
        if(error) throw error
    })
}

const getReportById= (req, res)=>{
    const uuid = parseInt(req.params.uuid)
    pool.query(queries.getReportById, [uuid], (error, results)=>{
        if(error) throw error
    })
}

const addEmployee = (req, res)=>{
    const {ssn, fname, minit, lname, stationid, bdate, phonenumber} = req.body
    pool.query(queries.checkSsnExist, [ssn], (error, results)=>{
        if(error.rows.length)
        {
            res.send("SSN already exist")
        }
        pool.query(queries.addEmployee, [ssn, fname, minit, lname, stationid, bdate, phonenumber], (error, results)=>{
            if(error) throw error
            res.status(201).send("Emplyee added success")
        })
    })
}

const AddReport = (req, res)=>{
    const {uuid, timestamp, temperature, velox, veloy, veloz, essn, stationid} = req.body
    pool.query(queries.checkUuidExist, [uuid], (error, results)=>{
        if(error.rows.length)
        {
            res.send("uuid already exist")
        }

        pool.query(queries.AddReport, [uuid, timestamp, temperature, velox, veloy, veloz, essn, stationid], (error, results)=>{
            if(results) throw error
            res.status(201).send("Emplyee added success")
        })
    })
}

const removeEmployee =(req, res)=>{
    const ssn = parseInt(req.params.ssn)
    pool.query(queries.removeEmployee, [ssn], (error, results)=>{
        const noEmployeeFound =!error.rows.length
        if(noEmployeeFound)
        res.send("EMPLOYEE does not exist")
    })
}
const removeReport =(req, res)=>{
    const uuid = parseInt(req.params.uuid)
    pool.query(queries.removeReport, [uuid], (error, results)=>{
        const noEmployeeFound =!error.rows.length
        if(noEmployeeFound)
        res.send("Report does not exist")

    })
}

module.exports = {
    getEmployee,
    addEmployee,
    getReport,
    getEmployeeById,
    getReportById,
    AddReport,
    removeEmployee,
    removeReport,
}