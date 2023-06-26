import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuCardReportComponent } from './setu-card-report.component';

describe('SetuCardReportComponent', () => {
  let component: SetuCardReportComponent;
  let fixture: ComponentFixture<SetuCardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetuCardReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetuCardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
