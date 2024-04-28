import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Metric } from '../../models/metric';
import { CommonModule } from '@angular/common';
import { Falsy } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SocialMediaService } from '../../services/social-media.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-metricsdashboard',
  imports: [FormsModule, CommonModule, NgxChartsModule],
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
  userEmail: string;

  // constructor(){};
  constructor(
    private http: HttpClient,
    private socialMediaService: SocialMediaService
  ) {
    this.userEmail = this.socialMediaService.email;
    this.fetchFollowerTrendData();
  }
  
  likesTikTokVideo: number = 50;
  likesInstagramVideo: number = 200;
  likesYouTubeVideo: number = 300;
  commentsTikTokVideo: number = 40;
  commentsInstagramVideo: number = 100;
  commentsYouTubeVideo: number = 150;
  likesTikTokPosts: number = 50;
  likesInstagramPosts: number = 200;
  likesYouTubePosts: number = 300;
  commentsTikTokPosts: number = 10;
  commentsInstagramPosts: number = 100;
  commentsYouTubePosts: number = 150;
  likesTikTok: number = 100;
  likesInstagram: number = 200;
  likesYouTube: number = 300;
  commentsTikTok: number = 50;
  commentsInstagram: number = 100;
  commentsYouTube: number = 150;
  followersTikTok: any[] = [100, 200, 300, 112, 500];
  followersInstagram: any[] = [100, 200, 332, 400, 500];
  followersYouTube: any[] = [100, 200, 300, 321, 500];
 



  fetchFollowerTrendData() {
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
 


  fetchFirstDashboardData() {
    this.http.get<any>('http://localhost:5064/Dashboard/getTotalNumOfFollowers').subscribe({
      next: (data) => {
        // Assuming data comes in the form of { likesTikTok: 100, likesInstagram: 200, ... }
        this.likesTikTok = data[0][0];
        this.likesInstagram = data[1][0];
        this.likesYouTube = data[2][0];
        this.commentsTikTok = data[0][1];
        this.commentsInstagram = data[1][1];
        this.commentsYouTube = data[2][1];
        // this.updateTableData();
      },
      error: (err) => console.error('Error fetching static data:', err)
    });
  }



  staticTableData: any[] = [
    [{ value: 'Tiktok' }, { value: 'Instagram' }, { value: 'Youtube' }],
    [{ value: this.likesTikTok + " Total likes" }, { value: this.likesInstagram + " Total likes" }, { value: this.likesYouTube + " Total likes"}],
    [{ value: this.commentsTikTok + " Total comments"}, { value: this.commentsInstagram + " Total comments"}, { value: this.commentsYouTube+ " Total comments"}],
  ];



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
  lineChartSeries: any[] = [
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