import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  cleanExpiredData() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key !== null) {
        const itemStr = sessionStorage.getItem(key);
        if (itemStr) {
          const item = JSON.parse(itemStr);
          const now = new Date();
          if (now.getTime() > item.expiry) {
            // Remove expired key form session storage
            sessionStorage.removeItem(key);
          }
        }
      }
    }
  }

  setItemWithExpiration(key: string, value: string, expiration_minutes: number){
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expiration_minutes * 60000
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string): any{
    return sessionStorage.getItem(key);
  }

  removeItem(key: string){
    sessionStorage.removeItem(key);
  }
}
