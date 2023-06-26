import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjayDashboardComponent } from './pmjay-dashboard.component';

describe('PmjayDashboardComponent', () => {
  let component: PmjayDashboardComponent;
  let fixture: ComponentFixture<PmjayDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjayDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjayDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
