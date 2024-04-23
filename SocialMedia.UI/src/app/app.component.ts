import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { MetricsdashboardComponent } from './components/metricsdashboard/metricsdashboard.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SigninComponent, MetricsdashboardComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SocialMedia.UI';
}