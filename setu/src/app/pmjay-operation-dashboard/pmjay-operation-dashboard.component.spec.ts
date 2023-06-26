import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmjayOperationDashboardComponent } from './pmjay-operation-dashboard.component';

describe('PmjayOperationDashboardComponent', () => {
  let component: PmjayOperationDashboardComponent;
  let fixture: ComponentFixture<PmjayOperationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmjayOperationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmjayOperationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
