import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {
  constructor(private http: HttpClient) { 
  }

  submitData(data: any) {
    console.log("Data submitted:", data);
    return this.http.put('http://localhost:5064/Dashboard/update/2', data);
  }
}
