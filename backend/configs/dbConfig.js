const Pool = require('pg').Pool

const sql = new Pool({
    user: "postgres",
    host: "localhost",
    database: "DATH",
    password: "123",
    port: 5432,
});

    (async () => {
        try {
            await sql.connect();
            console.log('Connected to the database');

            const res = await sql.query('SELECT version();');
            console.log('Database Version:', res.rows[0]);
        } catch (err) {
            console.error('Error connecting to the database:', err);
        } finally {
            //await sql.end();
        }
    })();

module.exports = { sql };