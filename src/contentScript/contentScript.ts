import { ScrapedProduct } from '../product/productService';
import { DBProduct } from '../database/databaseService';
import { getProductsFromSite } from '../product/productService';
import { fetchProducts } from '../database/databaseService';

let scrapedProducts: ScrapedProduct[] = [];
let dbProducts: DBProduct[] = [];

async function initializeProducts() {
  try {
    console.log('Products fetching from db started');
    dbProducts = await fetchProducts();
    console.log('Products loaded:', dbProducts);

    console.log('Products scraping started');
    scrapedProducts = await getProductsFromSite(dbProducts);
    console.log('Products scraped:', scrapedProducts);
  } catch (error) {
    console.error('Error while initializing products:', error);
  }
}

initializeProducts();

setInterval(async () => {
  try {
    console.log('Periodic scraping started');

    scrapedProducts = await getProductsFromSite(dbProducts);
    console.log('Products scraped:', scrapedProducts);
  } catch (error) {
    console.error('Error while scraping products:', error);
  }
}, 90000);
