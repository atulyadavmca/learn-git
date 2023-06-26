import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjayHomeDashboardComponent } from './pmjay-home-dashboard.component';

describe('PmjayHomeDashboardComponent', () => {
  let component: PmjayHomeDashboardComponent;
  let fixture: ComponentFixture<PmjayHomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjayHomeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjayHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
