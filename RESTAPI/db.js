const Pool = require('pg').Pool

const pool = new Pool({
    user: "c##gg",
    host: "localhost",
    database: "weather",
    password: "123",
    port: 5432,
})

module.exports = pool;