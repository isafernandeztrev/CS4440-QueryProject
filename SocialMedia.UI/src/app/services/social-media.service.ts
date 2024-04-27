// social-media-service.ts
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

  updatePost(postData: any) {
    console.log("postData submitted:", postData);
    return this.http.put('http://localhost:5064/Dashboard/updatePosts', postData);
  }

  updateVideo(videoData: any) {
    console.log("videoData submitted:", videoData);
    return this.http.put('http://localhost:5064/Dashboard/updateVideos', videoData);
  }
}
