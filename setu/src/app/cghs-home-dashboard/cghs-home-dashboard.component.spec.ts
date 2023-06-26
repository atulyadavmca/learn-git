import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsHomeDashboardComponent } from './cghs-home-dashboard.component';

describe('CghsHomeDashboardComponent', () => {
  let component: CghsHomeDashboardComponent;
  let fixture: ComponentFixture<CghsHomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsHomeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CghsHomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
