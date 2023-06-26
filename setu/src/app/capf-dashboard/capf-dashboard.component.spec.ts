import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapfDashboardComponent } from './capf-dashboard.component';

describe('CapfDashboardComponent', () => {
  let component: CapfDashboardComponent;
  let fixture: ComponentFixture<CapfDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapfDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapfDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
