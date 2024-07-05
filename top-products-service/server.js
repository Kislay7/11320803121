// server.js
const express = require('express');
const { TEST_SERVER_URL, MAX_PRODUCTS_PER_PAGE } = require('./config');
const EcommerceService = require('./services/ecommerceService');
const paginate = require('./utils/pagination');

const app = express();
const PORT = process.env.PORT || 3000;

function generateUniqueId(product) {
    return `${product.productName.replace(/\s+/g, '_')}_${product.price}`;
}
app.get('/categories/:categoryname/products', async (req, res) => {
    const category = req.params.categoryname;
    const n = parseInt(req.query.n, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const sortBy = req.query.sort_by;
    const order = req.query.order || 'asc';
    const minPrice = parseInt(req.query.minPrice, 10) || 0;
    const maxPrice = parseInt(req.query.maxPrice, 10) || Number.MAX_SAFE_INTEGER;

    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    let allProducts = [];

    for (const company of companies) {
        const products = await EcommerceService.getProducts(category, company, minPrice, maxPrice, n);
        products.forEach(product => {
            product.company = company;
            product.unique_id = generateUniqueId(product);
            allProducts.push(product);
        });
    }

    if (sortBy) {
        allProducts.sort((a, b) => {
            if (order === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
        });
    }

    const paginatedProducts = paginate(allProducts, page, Math.min(n, MAX_PRODUCTS_PER_PAGE));
    res.json(paginatedProducts);
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const category = req.params.categoryname;
    const productId = req.params.productid;

    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

    for (const company of companies) {
        const products = await EcommerceService.getProducts(category, company);
        for (const product of products) {
            if (generateUniqueId(product) === productId) {
                product.company = company;
                return res.json(product);
            }
        }
    }

    res.status(404).json({ error: "Product not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
