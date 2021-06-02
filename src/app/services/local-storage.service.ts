import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static encode<T = any>(data: T): string {
    return JSON.stringify({ data });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static decode<T = any>(value: string): T {
    return JSON.parse(value).data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(key: string, data: any) {
    localStorage.setItem(key, LocalStorageService.encode(data));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
