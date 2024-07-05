// services/ecommerceService.js
const axios = require('axios');
const { TEST_SERVER_URL } = require('../config');

class EcommerceService {
    static async registerAllCompanies() {
      
    }

    static async getProducts(category, company, minPrice, maxPrice, topN) {
        const url = `${TEST_SERVER_URL}/companies/${company}/categories/${category}/products?top-${topN}&minPrice-${minPrice}&maxPrice-${maxPrice}`;
        const response = await axios.get(url);
        return response.data;
    }
}

module.exports = EcommerceService;
