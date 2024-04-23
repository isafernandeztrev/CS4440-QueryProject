import { Component, OnInit } from '@angular/core'; // Import OnInit
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit { // Implement OnInit interface
  selectedPlatform: string = '';
  username: string = '';
  followers: number[] = new Array(5).fill(0);
  posts: any[] = [];
  userData: any = {};

  constructor() {
    // Constructor remains for dependency injection only, avoid initialization logic here
  }

  ngOnInit(): void { // Use ngOnInit for initialization logic
    this.updateForm();
  }

  initializeUserData() {
    this.userData = {
      selectedPlatform: this.selectedPlatform,
      username: this.username,
      followers: this.followers,
      posts: this.posts.map(post => ({
        type: post.type,
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        saves: post.saves,
        caption: post.caption,
        date: post.date
      }))
    };
  }

  updateForm(): void {
    // Assuming you want a default platform to start with or handle no platform selection gracefully
    if (!this.selectedPlatform) {
      this.selectedPlatform = 'Instagram'; // Set a default platform or manage the case when it's empty
    }
    this.posts = [];
    for (let i = 0; i < 10; i++) {
      this.posts.push({
        type: '',
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        caption: '',
        date: new Date().toISOString().substring(0, 10)
      });
    }

    this.initializeUserData(); // Initialize userData with defaults or based on platform
  }

  onSubmit(): void {
    console.log('Sending data to server:', this.userData);
    this.selectedPlatform = '';
    this.username = '';
    this.followers.fill(0);
    this.posts = this.posts.map(() => ({
      type: '',
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      caption: '',
      date: new Date().toISOString().substring(0, 10)
    }));
    this.initializeUserData(); // Reinitialize userData after form submission
  }
}
