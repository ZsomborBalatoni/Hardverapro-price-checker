import { ScrapedProduct } from '../product/productService';

export function storeHighestDataUadIds(
  highestDataUadIds: Record<string, number>
): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ highestDataUadIds }, () => {
      resolve();
    });
  });
}

export function getHighestDataUadIds(): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['highestDataUadIds'], (result) => {
      const storedHighestDataUadIds = result.highestDataUadIds || {};
      resolve(storedHighestDataUadIds);
    });
  });
}
