import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapfHomeDashboardComponent } from './capf-home-dashboard.component';

describe('CapfHomeDashboardComponent', () => {
  let component: CapfHomeDashboardComponent;
  let fixture: ComponentFixture<CapfHomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapfHomeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapfHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
