import { LocalStorageConfig } from 'ngrx-store-localstorage';

export const StoreKey = 'state';

export const storageConfig: LocalStorageConfig = {
  keys: [StoreKey],
  rehydrate: true,
  storage: localStorage
};
