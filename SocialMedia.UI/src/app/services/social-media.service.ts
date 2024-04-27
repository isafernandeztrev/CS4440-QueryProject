import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  private _email: string = '';

  constructor(private http: HttpClient) { }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  submitData(data: any) {
    console.log("Data submitted:", data);
    return this.http.put('http://localhost:5064/Dashboard/update', data);
  }
}
