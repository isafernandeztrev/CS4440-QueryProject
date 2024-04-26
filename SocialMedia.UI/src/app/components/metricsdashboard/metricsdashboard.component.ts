
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Metric } from '../../models/metric'; // Update the import path as necessary
import { CommonModule } from '@angular/common';
import { Falsy } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-metricsdashboard',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './metricsdashboard.component.html',
  styleUrls: ['./metricsdashboard.component.css']
})
// export class MetricsdashboardComponent implements OnInit {
//   // Simulated data
//   metricsData: Metric[] = [
//     { id: 1, platform: 'TikTok', totalLikes: 5000, numberOfComments: 300 },
//     { id: 2, platform: 'Facebook', totalLikes: 4500, numberOfComments: 250 },
//     { id: 3, platform: 'YouTube', totalLikes: 6000, numberOfComments: 400 }
//   ];
  
//   selectedTable = 'likesPerContentType';  // Default value
//   updateTable(selectedValue: string): void {
//     this.selectedTable = selectedValue;
//   }

//   constructor() { }

//   ngOnInit(): void {
//     // This is where you would eventually call your API
//     // this.fetchMetricsData();
//   }

//   // Simulated API call function
//   fetchMetricsData(): void {
//     // Here you'll use HttpClient to fetch data from your API in the future
//     // For now, it's just the simulated data
//   }

  
// }

export class MetricsdashboardComponent {
  selectedMetric: string = 'followerGrowth';
  tableData: any[] | null = null;
  tableData1: boolean = false;
  tableData2: boolean = false;
  tableData3: boolean = false;

  // constructor(){};
  constructor(private http: HttpClient) {
    this.fetchFollowerData();
  }
  likesTikTokVideo: number = 100;
  likesInstagramVideo: number = 200;
  likesYouTubeVideo: number = 300;
  commentsTikTokVideo: number = 50;
  commentsInstagramVideo: number = 100;
  commentsYouTubeVideo: number = 150;
  likesTikTokPosts: number = 100;
  likesInstagramPosts: number = 200;
  likesYouTubePosts: number = 300;
  commentsTikTokPosts: number = 50;
  commentsInstagramPosts: number = 100;
  commentsYouTubePosts: number = 150;
  likesTikTok: number = 100;
  likesInstagram: number = 200;
  likesYouTube: number = 300;
  commentsTikTok: number = 50;
  commentsInstagram: number = 100;
  commentsYouTube: number = 150;
  followersTikTok: any[] = [100, 200, 300, 400, 500];
  followersInstagram: any[] = [100, 200, 300, 400, 500];
  followersYouTube: any[] = [100, 200, 300, 400, 500];
  

  
  fetchFollowerData() {
    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumOfFollowers').subscribe({
      next: (data) => {
        // Assuming data comes in the form of { likesTikTok: 100, likesInstagram: 200, ... }
        this.followersTikTok = data[0];
        this.followersInstagram = data[1];
        this.followersYouTube = data[2];
        // this.updateTableData();
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }

  staticTableData: any[] = [
    [{ value: 'Tiktok' }, { value: 'Instagram' }, { value: 'Youtube' }],
    [{ value: this.likesTikTok+"asda" }, { value: this.likesInstagram }, { value: this.likesYouTube }],
    [{ value: this.commentsTikTok }, { value: this.commentsInstagram }, { value: this.commentsYouTube}],
  ];



  fetchData() {
    switch (this.selectedMetric) {
      case 'followerGrowth':
        this.tableData1 = true
        this.tableData2 = false;
        this.tableData3 = false;
        this.tableData = [
          { category: 'past 5 month', value: ['200', '300', '400']},
          { category: 'past 4 month', value: '450' },
          { category: 'past 3 month', value: '450' },
          { category: 'past 2 month', value: '450' },
          { category: 'past 1 month', value: '450' }
        ]
        break;
      case 'likesPerContentType':
        this.tableData1 = false;
        this.tableData2 = true;
        this.tableData3 = false;
        this.tableData = [
          { category: 'Posts', value: [1,2,3] },
          { category: 'Videos', value:[1,2,3] }
        ];
        break;
      case 'commentsPerContentType':
        this.tableData1 = false;
        this.tableData2 = false;
        this.tableData3 = true;
        this.tableData = [
          { category: 'Posts', value: [1,2,3] },
          { category: 'Videos', value: [1,2,3] }
        ];
        break;
      default:
        this.tableData = null;
    }
  }
}
