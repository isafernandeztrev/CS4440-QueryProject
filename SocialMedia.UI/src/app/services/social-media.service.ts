import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  constructor(private http: HttpClient) { }

  submitData(data: any) {
    console.log("data submitted")
    //return this.http.post('/api/socialmedia', data);
  }
}