import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Metric } from '../../models/metric';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SocialMediaService } from '../../services/social-media.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-metricsdashboard',
  imports: [FormsModule, CommonModule, NgxChartsModule],
  standalone: true,
  templateUrl: './metricsdashboard.component.html',
  styleUrls: ['./metricsdashboard.component.css']
})


export class MetricsdashboardComponent {
  selectedMetric: string = 'followerGrowth';
  tableData: any[] | null = null;
  tableData1: boolean = false;
  tableData2: boolean = false;
  tableData3: boolean = false;
  userEmail: string;
  likesPosts: number = 50;
  likesVideos: number = 200;
  commentsPosts: number = 100;
  commentsVideos: number = 150;
  likesTikTok: number = 100;
  likesInstagram: number = 200;
  likesYouTube: number = 300;
  commentsTikTok: number = 50;
  commentsInstagram: number = 100;
  commentsYouTube: number = 150;
  followersTikTok: any[] = [100, 200, 300, 112, 500];
  followersInstagram: any[] = [100, 200, 332, 400, 500];
  followersYouTube: any[] = [100, 200, 300, 321, 500];
  queryID = 1;
  contentType = 'Posts';
  staticTableData: any[] = [null, null, null];
  lineChartSeries: any[] = [null, null, null];


  constructor(
    private http: HttpClient,
    private socialMediaService: SocialMediaService
  ) {
    this.userEmail = this.socialMediaService.email;
    this.fetchFollowerTrendData();
    this.fetchFirstDashboardData();
    this.fetchLikesPosts();
    this.fetchLikesVideos();
    this.fetchCommentsPosts();
    this.fetchCommentsVideos();
    this.staticTableData = [
      [{ value: 'Tiktok' }, { value: 'Instagram' }, { value: 'Youtube' }],
      [{ value: this.likesTikTok + " Total likes" }, { value: this.likesInstagram + " Total likes" }, { value: this.likesYouTube + " Total likes"}],
      [{ value: this.commentsTikTok + " Total comments"}, { value: this.commentsInstagram + " Total comments"}, { value: this.commentsYouTube+ " Total comments"}],
    ];


    this.lineChartSeries= [
      {
        name: 'TikTok',
        series: [
          { name: '5 months ago', value: this.followersTikTok[0] },
          { name: '4 months ago', value: this.followersTikTok[1] },
          { name: '3 months ago', value: this.followersTikTok[2] },
          { name: '2 months ago', value: this.followersTikTok[3] },
          { name: 'Last month', value: this.followersTikTok[4] }
        ]
      },
      {
        name: 'Instagram',
        series: [
          { name: '5 months ago', value: this.followersInstagram[0] },
          { name: '4 months ago', value: this.followersInstagram[1] },
          { name: '3 months ago', value: this.followersInstagram[2] },
          { name: '2 months ago', value: this.followersInstagram[3] },
          { name: 'Last month', value: this.followersInstagram[4] }
        ]
      },
      {
        name: 'YouTube',
        series: [
          { name: '5 months ago', value: this.followersYouTube[0] },
          { name: '4 months ago', value: this.followersYouTube[1] },
          { name: '3 months ago', value: this.followersYouTube[2] },
          { name: '2 months ago', value: this.followersYouTube[3] },
          { name: 'Last month', value: this.followersYouTube[4] }
        ]
      }
    ];
  }

  fetchFollowerTrendData() {
    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumOfFollowers').subscribe({
      next: (data) => {
        // Assuming data comes in the form of { likesTikTok: 100, likesInstagram: 200, ... }
        this.followersTikTok = data[0];
        this.followersInstagram = data[2];
        this.followersYouTube = data[1];
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }
 


  fetchFirstDashboardData() {
    let params = new HttpParams().set('description', this.userEmail);
    this.http.get<any>('http://localhost:5064/Dashboard/getFirstDashboard', { params }).subscribe({
      next: (data) => {
        this.likesTikTok = data[0][0];
        this.likesInstagram = data[2][0];
        this.likesYouTube = data[1][0];
        this.commentsTikTok = data[0][1];
        this.commentsInstagram = data[2][1];
        this.commentsYouTube = data[1][1];
        // this.updateTableData();
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  
  fetchLikesPosts() {
    this.queryID = 0;
    this.contentType = 'Posts';
    let params = new HttpParams()
    .set('queryID', this.queryID.toString())
    .set('contentType', this.contentType);    
    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumberOfLikesAndComments', { params }).subscribe({
      next: (data) => {
        this.likesPosts = data
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  fetchLikesVideos() {
    this.queryID = 0;
    this.contentType = 'Videos';
    let params = new HttpParams()
    .set('queryID', this.queryID.toString())
    .set('contentType', this.contentType);    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumberOfLikesAndComments', { params }).subscribe({
      next: (data) => {
        this.likesVideos = data
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  fetchCommentsPosts() {
    this.queryID = 1;
    this.contentType = 'Posts';
    let params = new HttpParams()
    .set('queryID', this.queryID.toString())
    .set('contentType', this.contentType);    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumberOfLikesAndComments', { params }).subscribe({
      next: (data) => {
        this.commentsPosts = data
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  fetchCommentsVideos() {
    this.queryID = 1;
    this.contentType = 'Videos';
    let params = new HttpParams()
    .set('queryID', this.queryID.toString())
    .set('contentType', this.contentType);    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumberOfLikesAndComments', { params }).subscribe({
      next: (data) => {
        this.commentsVideos = data
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  fetchData() {
    switch (this.selectedMetric) {
      case 'followerGrowth':
        this.tableData1 = true
        this.tableData2 = false;
        this.tableData3 = false;
        this.tableData = [
          { category: 'TikTok', value:this.followersTikTok },
          { category: 'Instagram', value:this.followersInstagram },
          { category: 'Youtube', value: this.followersYouTube }
        ]
        break;
      case 'likesPerContentType':
        this.tableData1 = false;
        this.tableData2 = true;
        this.tableData3 = false;
        this.tableData = [
          { category: 'Posts', value: this.likesPosts },
          { category: 'Videos', value: this.likesVideos }
        ];
        break;
      case 'commentsPerContentType':
        this.tableData1 = false;
        this.tableData2 = false;
        this.tableData3 = true;
        this.tableData = [
          { category: 'Posts', value: this.commentsPosts },
          { category: 'Videos', value: this.commentsVideos }
        ];
        break;
      default:
        this.tableData = null;
    }
  }

  // Chart view dimensions
  view: [number, number] = [700, 300]; // example width and height

  // Options for the line chart
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Followers';

}