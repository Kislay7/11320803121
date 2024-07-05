import { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import ProductCard from './ProductCard';

const ProductList = ({ company, category, minPrice, maxPrice, n }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(company, category, minPrice, maxPrice, n);
      setProducts(data);
    };
    fetchProducts();
  }, [company, category, minPrice, maxPrice, n]);

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
