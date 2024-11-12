import { ScrapedProduct } from '../product/productService';
import { DBProduct } from '../database/databaseService';
import { getProductsFromSite } from '../product/productService';
import { fetchProducts } from '../database/databaseService';
import {
  storeHighestDataUadIds,
  getHighestDataUadIds,
} from '../storage/storageService';

let dbProducts: DBProduct[] = [];

async function initializeProducts() {
  try {
    console.log('Products fetching from db started');
    dbProducts = await fetchProducts();
    console.log('Products loaded:', dbProducts);

    console.log('Get the highest dataUadIds from chrome.storage');
    const highestDataUadIds = await getHighestDataUadIds();

    console.log('Products scraping started');
    const scrapedProducts = await getProductsFromSite(
      dbProducts,
      highestDataUadIds
    );
    console.log('Products scraped:', scrapedProducts);

    scrapedProducts.forEach((product) => {
      const currentHighest = highestDataUadIds[product.name] || 0;
      highestDataUadIds[product.name] = Math.max(
        currentHighest,
        parseInt(product.dataUadId, 10)
      );
    });

    await storeHighestDataUadIds(highestDataUadIds);
    console.log(
      'Highest dataUadIds stored in chrome.storage:',
      highestDataUadIds
    );
  } catch (error) {
    console.error('Error while initializing products:', error);
  }
}

initializeProducts();

setInterval(async () => {
  try {
    console.log('Periodic scraping started');

    const highestDataUadIds = await getHighestDataUadIds();
    const scrapedProducts = await getProductsFromSite(
      dbProducts,
      highestDataUadIds
    );
    console.log('Products scraped:', scrapedProducts);

    scrapedProducts.forEach((product) => {
      const currentHighest = highestDataUadIds[product.name] || 0;
      highestDataUadIds[product.name] = Math.max(
        currentHighest,
        parseInt(product.dataUadId, 10)
      );
    });

    await storeHighestDataUadIds(highestDataUadIds);
    console.log(
      'Highest dataUadIds stored in chrome.storage:',
      highestDataUadIds
    );
  } catch (error) {
    console.error('Error while scraping products:', error);
  }
}, 90000);
