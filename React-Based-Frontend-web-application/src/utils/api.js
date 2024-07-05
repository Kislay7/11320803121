import axios from 'axios';

const URL = 'http://20.244.56.144/test';

export const getProducts = async (company, category, minPrice, maxPrice, n) => {
  try {
    const response = await axios.get(`${URL}/companies/${company}/categories/${category}/products/top-${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return []; 
  }
};
