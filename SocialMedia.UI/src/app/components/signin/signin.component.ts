import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialMediaService } from '../../services/social-media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  selectedPlatform: string = '';
  email: string = '';
  username: string = '';
  currentDate: any = new Date().toISOString().substring(0, 10);
  followers: number = 0;
  following: number = 0;
  posts: any[] = [];
  userData: any = {};

  constructor(
    private socialMediaService: SocialMediaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm();
  }

  initializeUserData() {
    this.userData = {
      Platform: this.selectedPlatform,
      Description: this.email,
      PlatformUsername: this.username,
      FollowerCount: this.followers,
      FollowingCount: this.following,
      CreationDate: this.currentDate
    };
  }

  updateForm(): void {
    if (!this.selectedPlatform) {
      this.selectedPlatform = 'Instagram'; // default platform
    }
    this.username = '';
    this.currentDate = new Date().toISOString().substring(0, 10);
    this.followers = 0;
    this.following = 0;
    this.posts = [];
    for (let i = 0; i < 10; i++) {
      this.posts.push({
        type: 'Post', // Assuming some are 'Video' for testing
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        caption: '',
        date: new Date().toISOString().substring(0, 10)
      });
    }

    this.initializeUserData();
  }

  navigateToDashboard() {
    this.router.navigate(['/metricsdashboard']);
  }

  onSubmit(): void {
    this.initializeUserData();
    this.socialMediaService.email = this.email;
    console.log('Global email:', this.socialMediaService.email);

    // Submit user data once
    this.socialMediaService.submitData(this.userData).subscribe({
      next: (response) => {
        console.log('User data submitted successfully: ', this.userData);

        // Handle posts based on type
        this.posts.forEach(post => {
          if (post.type === "Post") {
            const postData = {
              Email: this.email,
              Platform: this.selectedPlatform,
              Caption: post.caption,
              Date: post.date,
              LikesCount: post.likes,
              CommentsCount: post.comments
            };
            this.socialMediaService.updatePost(postData).subscribe({
              next: (res) => console.log('Post updated successfully', res),
              error: (err) => console.error('Error updating post', err)
            });
          } else if (post.type === "Video") {
            const videoData = {
              Email: this.email,
              Platform: this.selectedPlatform,
              Description: post.caption, 
              UploadDate: post.date,
              LikesCount: post.likes,
              CommentsCount: post.comments
            };
            this.socialMediaService.updateVideo(videoData).subscribe({
              next: (res) => console.log('Video updated successfully', res),
              error: (err) => console.error('Error updating video', err)
            });
          }
        });

        // Navigate to Dashboard after all operations
        this.navigateToDashboard();
      },
      error: (error) => {
        console.error('Error submitting user data:', error);
      }
    });
  }
}
