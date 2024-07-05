import ProductList from '../components/ProductList';

const AllProductsPage = () => {
  return (
    <div>
      <h1>All Products</h1>
      <ProductList company="AMZ" category="Laptop" minPrice={1} maxPrice={10000} n={10} />
    </div>
  );
};

export default AllProductsPage;
