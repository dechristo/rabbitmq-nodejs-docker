
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private readonly apiUrl = 'http://localhost:3000/message';

  constructor(private http: HttpClient) {

  }

  public send(text: string) {
    return this.http.post<Message>(this.apiUrl,  { msg: text}, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      }
    });
  }
}
