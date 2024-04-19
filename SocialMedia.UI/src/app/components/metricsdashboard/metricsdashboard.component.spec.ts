import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsdashboardComponent } from './metricsdashboard.component';

describe('MetricsdashboardComponent', () => {
  let component: MetricsdashboardComponent;
  let fixture: ComponentFixture<MetricsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
