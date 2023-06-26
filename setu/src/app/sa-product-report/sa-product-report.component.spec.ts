import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaProductReportComponent } from './sa-product-report.component';

describe('SaProductReportComponent', () => {
  let component: SaProductReportComponent;
  let fixture: ComponentFixture<SaProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaProductReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
