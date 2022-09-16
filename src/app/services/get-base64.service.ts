import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetBase64Service {
  constructor(private httpClient: HttpClient) {}

  makeHttpRequest(decoded: any): Observable<Object> {
    const body = decoded.data;
    const method = decoded.method;
    const headers = decoded.headers;
    const requestURL = decoded.requestURL;

    if (method === 'GET' || method === 'get') {
      return this.httpClient.get(requestURL, { headers }).pipe(shareReplay());
    }
    if (method === 'POST' || method === 'post') {
      return this.httpClient
        .post(requestURL, body, { headers })
        .pipe(shareReplay());
    }
    return this.httpClient.get(requestURL, { headers }).pipe(shareReplay());
  }

  getDataPath(obj: any, path: string): any {
    const arrFields = path.split('.');
    const resp = arrFields.reduce((val, field) => val[field], obj);
    return resp;
  }

  getDefaultBase64() {
    return this.httpClient
      .get('/assets/pdfs/pdf-docs.base64.txt', {
        responseType: 'text' as 'json',
      })
      .pipe(shareReplay());
  }
}
