import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BisReportComponent } from './bis-report.component';

describe('BisReportComponent', () => {
  let component: BisReportComponent;
  let fixture: ComponentFixture<BisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
