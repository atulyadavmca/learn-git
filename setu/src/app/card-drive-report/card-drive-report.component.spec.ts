import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDriveReportComponent } from './card-drive-report.component';

describe('CardDriveReportComponent', () => {
  let component: CardDriveReportComponent;
  let fixture: ComponentFixture<CardDriveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDriveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDriveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
