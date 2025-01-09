const sql = require('mssql');

const dbConfig = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'ProgrammingIntegrationProject',
    connectionTimeout: 600000,
    requestTimeout: 600000,
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        multipleActiveResultSets: true
    }
};

// Function to connect to the database
const connectToDatabase = async () =>
{
    try
    {
        await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
    }
    catch (err)
    {
        console.error('Database connection failed:', err);
    }
};

module.exports = {
    connectToDatabase,
    sql
};
