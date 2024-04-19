import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsdashboardComponent } from './trendsdashboard.component';

describe('TrendsdashboardComponent', () => {
  let component: TrendsdashboardComponent;
  let fixture: ComponentFixture<TrendsdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendsdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
