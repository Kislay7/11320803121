import { useParams } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';

const ProductPage = ({ products }) => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  return (
    <div>
      {product ? <ProductDetails product={product} /> : <p>Product not found</p>}
    </div>
  );
};

export default ProductPage;
