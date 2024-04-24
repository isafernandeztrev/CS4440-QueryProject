// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-metricsdashboard',
//   standalone: true,
//   imports: [],
//   templateUrl: './metricsdashboard.component.html',
//   styleUrl: './metricsdashboard.component.css'
// })
// export class MetricsdashboardComponent {

// }

// src/app/components/metricsdashboard/metricsdashboard.component.ts
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Metric } from '../../models/metric'; // Update the import path as necessary
import { CommonModule } from '@angular/common';

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

  constructor() {}

  staticTableData: any[] = [
    [{ value: 'Data 1-1' }, { value: 'Data 1-2' }, { value: 'Data 1-3' }],
    [{ value: 'Data 2-1' }, { value: 'Data 2-2' }, { value: 'Data 2-3' }],
    [{ value: 'Data 3-1' }, { value: 'Data 3-2' }, { value: 'Data 3-3' }],
  ];



  fetchData() {
    switch (this.selectedMetric) {
      case 'followerGrowth':
        this.tableData = [
          { category: 'January', value: '200' },
          { category: 'February', value: '450' }
        ];
        break;
      case 'likesPerContentType':
        this.tableData = [
          { category: 'Blogs', value: '150' },
          { category: 'Videos', value: '300' }
        ];
        break;
      case 'commentsPerContentType':
        this.tableData = [
          { category: 'Blogs', value: '75' },
          { category: 'Videos', value: '120' }
        ];
        break;
      default:
        this.tableData = null;
    }
  }
}
