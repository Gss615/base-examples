import { Injectable } from '@angular/core';
import {PROJECT_NAME} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
	private static _getStorage(storageType: any) {
		return storageType === 'local' ? localStorage : sessionStorage;
	}
  
static getItem(storageType: any, key: string) {
  const storage = LocalStorageService._getStorage(storageType);
  const val = storage.getItem(`${PROJECT_NAME}:${key}`);
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}
  
static setItem(storageType: any, key: string, value: any) {
  const storage = LocalStorageService._getStorage(storageType);
  const val = typeof value === 'string' ? value : JSON.stringify(value);
  storage.setItem(`${PROJECT_NAME}:${key}`, val);
}
  
static removeItem(storageType: any, key: string) {
		const storage = LocalStorageService._getStorage(storageType);
		storage.removeItem(`${PROJECT_NAME}:${key}`);
	}

}
