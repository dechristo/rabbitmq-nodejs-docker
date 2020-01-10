
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private readonly apiBaseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {

  }

  public sendHttp(text: string) {
    return this.http.post<Response>(this.apiBaseUrl + 'request',  { msg: text}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });
  }

  public sendAMQP(text: string) {
    return this.http.post<Response>(this.apiBaseUrl + 'message',  { msg: text}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });
  }
}
