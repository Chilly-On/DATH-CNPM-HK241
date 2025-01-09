const express = require('express');
const path = require('path');
//const { connectToDatabase } = require('./configs/dbConfig');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
// Link to static files
app.use(express.static(path.join(__dirname, '..', 'UI-cnpm')));
// Register the product routes
app.use('/product', productRoutes);

// Homepage
app.get('/', (req, res) =>
{
    res.redirect('/product');
});

// Start the Express server
app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});
