import emailjs from 'emailjs-com';
import { ScrapedProduct } from '../product/productService';

const EMAILJS_SERVICE_ID = '';
const EMAILJS_TEMPLATE_ID = '';
const EMAILJS_USER_ID = '';

export function sendChromeNotification(scrapedProducts: ScrapedProduct[]) {
  const product_details = scrapedProducts
    .map((product) => `${product.name} - ${product.price}HUF`)
    .join('\n');
  const notificationOptions: chrome.notifications.NotificationOptions<true> = {
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'New Products Available!',
    message: product_details,
  };

  chrome.notifications.create(
    'productsNotification',
    notificationOptions,
    (notificationId) => {
      console.log('Notification sent with ID:', notificationId);
    }
  );
}

export async function sendEmailNotification(scrapedProducts: ScrapedProduct[]) {
  try {
    const templateParams = {
      user_email: '',
      subject: 'New Products Available!',
      product_details: scrapedProducts
        .map((product) => `${product.name} - ${product.price}HUF`)
        .join('\n'),
    };

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_USER_ID
    );

    console.log('Email notification sent successfully:', result.text);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}
