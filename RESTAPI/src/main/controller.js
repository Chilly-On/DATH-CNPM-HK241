const pool = require("../../db")
const path = require('path')
//const queries = require("./queries")

// the api corresponding to page or function
const homepage = (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'home.html'));
}

module.exports = {
    homepage
}