import { ScrapedProduct } from '../product/productService';
import { sendChromeNotification } from '../notification/notificationService';

function injectContentScript(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['contentScript.js'],
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectScript') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        injectContentScript(activeTab.id);
      }
    });
    sendResponse({ status: 'injection_attempted' });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showNotification') {
    const products = message.products;
    sendChromeNotification(products);
  }
});
