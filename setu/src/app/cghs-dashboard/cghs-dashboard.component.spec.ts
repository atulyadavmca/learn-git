import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsDashboardComponent } from './cghs-dashboard.component';

describe('CghsDashboardComponent', () => {
  let component: CghsDashboardComponent;
  let fixture: ComponentFixture<CghsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CghsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
