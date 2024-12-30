const getEmployee = "SELECT * FROM EMPLOYEE"
const getReport = "SELECT * FROM REPORT"
const getEmployeeById = "SELECT * FROM EMPLOYEE WHERE ssn = $1"
const getReportById = "SELECT * FROM REPORT WHERE uuid = $1"
const checkSsnExist ="SELECT * FROM EMPLOYEE WHERE ssn = $1"
const addEmployee="INSERT INTO EMPLOYEE (ssn, fname, minit, lname, stationid, bdate, phonenumber) VALUES ($1, $2, $3, $4, $5, $6, $7)"
const checkUuidExist ="SELECT * FROM REPORT WHERE uuid = $1"
const AddReport="INSERT INTO REPORT (uuid, timestamp, temperature, velox, veloy, veloz, essn, stationid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
const removeEmployee="DELETE FROM EMPLOYEE WHERE ssn = $1"
const removeReport="DELETE FROM REPORT WHERE uuid = $1"


module.exports ={
    getEmployee,
    getReport,
    getEmployeeById,
    getReportById,
    checkSsnExist,
    addEmployee,
    checkUuidExist,
    AddReport,
    removeEmployee,
    removeReport,
}