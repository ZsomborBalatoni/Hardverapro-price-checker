import { Product } from '../product/IProduct';
import { getProducts } from '../product/productService';

let products: Product[] = [];

getProducts()
  .then((initProducts) => {
    console.log('Init getProducts started');
    products = initProducts;
    console.log('Initial products fetched:', products);
  })
  .catch((error) => {
    console.error('Error fetching initial products:', error);
  });

// Fetch products at intervals
setInterval(async () => {
  try {
    console.log('Product fetch started');
    products = await getProducts();
    console.log('Products fetched:', products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}, 30000);
