import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CghsReportComponent } from './cghs-report.component';

describe('CghsReportComponent', () => {
  let component: CghsReportComponent;
  let fixture: ComponentFixture<CghsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CghsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CghsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
