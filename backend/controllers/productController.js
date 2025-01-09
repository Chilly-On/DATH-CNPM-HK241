const { sql } = require('../configs/dbConfig');

const getDataByName = async (req, res) => {
    const { name } = req.params; // Lấy 'name' từ route parameters

    if (!name) return res.status(400).json({ message: 'Name is required' });

    try {
        const pool = await sql.connect();
        const query = `
            SELECT Name, Price, Warranty, Brand, Description, OtherInfor
            FROM Product
            WHERE Name = @name;
        `;

        const result = await pool.request()
            .input('name', sql.NVarChar, name)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = result.recordset[0];
        return res.status(200).json({
            name: product.Name,
            price: product.Price,
            warranty: product.Warranty,
            brand: product.Brand,
            description: product.Description,
            otherInfor: product.OtherInfor,
        });
    } catch (error) {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: 'Error getting product' });
    }
};

// const getDataByName = async (req, res) => {
//     const { name } = req.params;

//     console.log('Received name:', name); // Kiểm tra giá trị nhận được từ Frontend

//     if (!name) return res.status(400).json({ message: 'Name is required' });

//     try {
//         const pool = await sql.connect();
//         const query = `
//             SELECT Name, Price, Warranty, Brand, Description, OtherInfor
//             FROM Product
//             WHERE Name = @name;
//         `;

//         const result = await pool.request()
//             .input('name', sql.NVarChar, name)
//             .query(query);

//         console.log('Query result:', result.recordset); // Log kết quả trả về từ SQL

//         if (result.recordset.length === 0) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         const product = result.recordset[0];
//         return res.status(200).json(product);
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Error fetching product' });
//     }
// };

const getDataById = async (req, res) =>
{
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Id is required' });

    try
    {
        const pool = await sql.connect();
        const query = `
            SELECT ProductId, Name, Price, Warranty, Brand, Description, OtherInfor 
            FROM Product
            WHERE ProductId = @id;
        `;

        const result = await pool.request().input('id', sql.Int, id).query(query);

        if (result.recordset.length === 0) return res.status(404).json({ message: 'Product not found' });
        return res.status(200).json(result.recordset[0]);
    }
    catch (error)
    {
        console.error('Error getting product:', error);
        return res.status(500).json({ message: 'Error getting product' });
    }
}

const getAllData = async (req, res) =>
{
    try
    {
        const pool = await sql.connect();
        const query = `
            SELECT ProductId, Name, Price, Warranty, Brand, Description, OtherInfor 
            FROM Product;
        `;

        const result = await pool.request().query(query);

        return res.status(200).json(result.recordset);
    }
    catch (error)
    {
        console.error('Error getting products:', error);
        return res.status(500).json({ message: 'Error getting products' });
    }
};


const insertProduct = async (req, res) =>
{
    const { name, price, warranty, brand, description, otherInfor } = req.body;

    console.log(`name: ${name}, price ${price}`);
    
    if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

    try
    {
        const pool = await sql.connect();
        const query = `
            INSERT INTO Product (Name, Price, Warranty, Brand, Description, OtherInfor)
            VALUES (@name, @price, @warranty, @brand, @description, @otherInfor)
        `;

        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('price', sql.Decimal(10, 2), price)
            .input('warranty', sql.NVarChar, warranty)
            .input('brand', sql.NVarChar, brand)
            .input('description', sql.NVarChar, description)
            .input('otherInfor', sql.NVarChar, otherInfor)
            .query(query);

        return res.status(200).json({ message: 'Product added successfully' });
    }
    catch (error)
    {
        console.error('Error inserting product:', error);
        return res.status(500).json({ message: 'Error adding product' });
    }
};

module.exports = {
    getDataByName,
    insertProduct,
    getDataById,
    getAllData,
};
