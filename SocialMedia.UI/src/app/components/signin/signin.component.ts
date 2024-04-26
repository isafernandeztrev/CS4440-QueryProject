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
  followers: number=0;
  following: number=0;
  posts: any[] = [];
  userData: any = {};
  postData: any = {};

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
    }
    this.postData = {
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
        type: '',
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
    console.log("navigating");
    this.router.navigate(['/metricsdashboard']);
  }

  onSubmit(): void {
    this.initializeUserData();
    //console.log(this.userData);
    
    this.socialMediaService.submitData(this.userData).subscribe({ // post api call
      next: 
      (response) => 
        {
          console.log('User data submitted successfully: ', this.userData);
          console.log('Post data submitted successfully: ', this.postData);
          this.updateForm()
        },
        error: (error) => 
          {
            console.error('Error submitting data:', error);
          }
        });
  }

    }

