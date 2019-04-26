import { resolve } from 'url';
import axios from 'axios';

let exportedFetchInventory;

if (process.env.OFFLINE) {
  exportedFetchInventory = new Promise(() =>
    resolve({ data: { inventory: [234] } })
  );
} else {
  exportedFetchInventory = axios.get('/api/inventory');
}

export default {
  fetchInventory: exportedFetchInventory,
};
