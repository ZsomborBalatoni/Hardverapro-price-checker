import axios from 'axios';
import * as cheerio from 'cheerio';
import { Product } from './IProduct';

const TARGET_URL =
  'https://hardverapro.hu/aprok/hardver/processzor/amd/keres.php?stext=7800x3d&stcid_text=&stcid=&stmid_text=&stmid=&minprice=&maxprice=&cmpid_text=&cmpid=&usrid_text=&usrid=&__buying=0&__buying=1&stext_none=';
const TARGET_PRICE = 136000;

export async function getProducts(): Promise<Product[]> {
  console.log('Product fetching started');

  const products: Product[] = [];

  try {
    const response = await axios.get(TARGET_URL);
    const $ = cheerio.load(response.data);

    $('li[data-uadid]').each((index, element) => {
      const classAttr = $(element).attr('class') || '';
      if (!/^media $/.test(classAttr)) {
        return;
      }

      const dataUadId = $(element).attr('data-uadid');
      if (!dataUadId) {
        return;
      }

      const priceText = $(element).find('.uad-price').text().replace(/\D/g, '');
      const price = parseInt(priceText, 10);

      if (dataUadId && !isNaN(price)) {
        products.push({ dataUadId, price });
      }
    });

    console.log('Product fetching ended, fetched products: ', products.length);
    return products;
  } catch (error) {
    console.error('Error while fetching data: ', error);
    return [];
  }
}
