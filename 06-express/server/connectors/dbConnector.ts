import fs from 'fs';

import { Cart } from './../types';

export class dbConnector {
  static getDBData(filtered = true): Record<string, Cart[]> {
    const rawData = fs.readFileSync('./storage.json');
    const storage: Record<string, Cart[]> = JSON.parse(rawData.toString());
    if (filtered) {
      const processedStorage = storage.carts.filter(item => item?.deleted !== true)
      storage.carts = processedStorage;
      return storage;

    }

    return storage
  };

  static setDBData(data: Record<string, Cart[]>) {
    const processedData = JSON.stringify(data, null, 2);
    fs.writeFileSync('./storage.json', processedData);
  };
};
