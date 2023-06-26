import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHomeDashboardComponent } from './claim-home-dashboard.component';

describe('ClaimHomeDashboardComponent', () => {
  let component: ClaimHomeDashboardComponent;
  let fixture: ComponentFixture<ClaimHomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimHomeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
