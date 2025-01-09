const express = require('express');
const { homepage, getDataByName, getDataById, getAllData, insertProduct } = require('../controllers/productController');
const router = express.Router();

// Homepage
router.get('/', homepage);

// Insert a new product
router.post('/add', insertProduct);

// Get a product by name
router.get('/get/name/:name', getDataByName);

// Get a product by id
router.route("/get/id/:id").get(getDataById);

// Get all products
router.route("/get/all").get(getAllData);

//router.route("/get/name/:name").get(getDataByName);
module.exports = router;
