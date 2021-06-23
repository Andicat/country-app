import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguageService {
  private url = 'https://parseapi.back4app.com/classes/Language?count=1&limit=1000';
  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
      'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
    }),
  };

  private languages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  loadLanguages(): Observable<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(this.url, this.httpOptions).pipe(
      map(res =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.results.map((item: any) => {
          return item.name;
        }),
      ),
    );
  }

  getLanguages(): BehaviorSubject<string[]> {
    return this.languages$;
  }

  setLanguages(languages: string[]): void {
    this.languages$.next(languages);
  }
}
