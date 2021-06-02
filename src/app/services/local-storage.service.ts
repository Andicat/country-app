import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  static encode<T = any>(data: T): string {
    return JSON.stringify({ data });
  }

  static decode<T = any>(value: string): T {
    return JSON.parse(value).data;
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, LocalStorageService.encode(data));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);

    return value ? LocalStorageService.decode(value) : null;
  }

  clear() {
    localStorage.clear();
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
